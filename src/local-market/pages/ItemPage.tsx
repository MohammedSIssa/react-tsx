import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import type { Item } from "../types";

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setError("");
        const res = await API.get(`/items/${id}`);
        setItem(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response) {
          // Axios error with response
          switch (error.response.status) {
            case 404:
              setError("Item not found");
              break;
            case 500:
              setError("Server error, please try again later");
              break;
            case 403:
              setError("Access forbidden");
              break;
            default:
              setError(`Error: ${error.response.status}`);
          }
        } else {
          // Network or other error
          setError("Network error or unexpected issue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleTradeRequest = async () => {
    if (!auth?.user) {
      navigate("/auth");
      return;
    }

    try {
      await API.post("/trades", {
        item_id: item?.id,
      });
      alert("Trade request sent!");
      navigate("/trades");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.error || "Trade failed");
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading item...</p>;
  if (error || !item)
    return (
      <div className="mx-auto max-w-4xl p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back
        </button>
        <p className="text-center text-red-500">{error}</p>;
      </div>
    );

  const isOwner = auth?.user?.id === item.owner_id;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <div className="rounded-lg border p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold">{item.title}</h1>
        <p className="mb-4 text-gray-600">{item.description}</p>

        <div className="mb-4 text-sm text-gray-500">
          <p>Owner: {item.owner_name}</p>
          <p>Status: {item.status}</p>
        </div>

        {!isOwner && (
          <button
            onClick={handleTradeRequest}
            className="cursor-pointer rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
          >
            Request Trade
          </button>
        )}

        {isOwner && (
          <p className="font-medium text-yellow-600">This is your item</p>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
