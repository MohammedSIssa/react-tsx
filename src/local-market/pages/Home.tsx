import { useEffect, useState } from "react";
import API from "../api/api";
import type { Item } from "../types";

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get("/items");
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading items...</p>;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Local Marketplace</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border p-4 shadow transition hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-1 text-gray-600">{item.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Owner: {item.owner_name} | Status: {item.status}
              </p>
              <button className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
                View / Trade
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
