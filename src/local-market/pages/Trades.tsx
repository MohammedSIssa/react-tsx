import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../api/api";

interface Trade {
  id: number;
  status: string;
  item_id: number;
  title: string;
  // other_user_name: string;
}

const Trades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await API.get("/trades/my");
        setTrades(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  if (loading) {
    return <p className="mt-10 text-center">Loading trades...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-6 text-3xl font-bold">My Trades</h1>

      {trades.length === 0 ? (
        <p className="text-gray-500">You have no trades yet.</p>
      ) : (
        <div className="space-y-4">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between rounded-lg border p-4 shadow transition hover:shadow-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{trade.title}</h2>
                {/* <p className="text-sm text-gray-600">
                  With: {trade.other_user_name}
                </p> */}
                <p className="mt-1 text-sm">
                  Status:{" "}
                  <span
                    className={
                      trade.status === "pending"
                        ? "text-yellow-600"
                        : trade.status === "accepted"
                          ? "text-green-600"
                          : trade.status === "rejected"
                            ? "text-red-600"
                            : "text-gray-600"
                    }
                  >
                    {trade.status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/trades/${trade.id}`)}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trades;
