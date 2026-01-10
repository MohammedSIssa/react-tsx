import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import type { Item, Trade, User } from "../types";
// import { Navigate } from "react-router";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(auth?.user || null);
  const [items, setItems] = useState<Item[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [itemsRes, tradesRes, userRes] = await Promise.all([
          API.get("/items/my"), // your backend route for user items
          API.get("/trades/my"), // backend route for user trades
          API.get("/auth/me"), // fetch latest user info (reputation etc.)
        ]);

        setItems(itemsRes.data);
        setTrades(tradesRes.data);
        setUser(userRes.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = async () => {
    await auth?.logout();
    // window.location.href = "/auth";
    // <Navigate to={"/auth"} />;
  };

  if (loading) return <p className="mt-10 text-center">Loading dashboard...</p>;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {user && (
        <div className="mb-6 rounded border bg-gray-50 p-4 shadow">
          <h2 className="text-xl font-semibold">Hello, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Reputation: {user.reputation || 0}</p>
        </div>
      )}

      {/* My Items */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">My Items</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">You have no items listed.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded border p-4 shadow transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Status: {item.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Trades */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">My Trades</h2>
        {trades.length === 0 ? (
          <p className="text-gray-500">You have no active trades.</p>
        ) : (
          <div className="space-y-4">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="rounded border p-4 shadow transition hover:shadow-lg"
              >
                <p>
                  Trade #{trade.id} — Item ID: {trade.item_id} — Status:{" "}
                  {trade.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
