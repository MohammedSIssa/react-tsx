import type { Log } from "../../types/Log";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Logs() {
  const [data, setData] = useState<Log[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    async function getLogs() {
      try {
        setLoading(true);
        const res = await fetch(import.meta.env.VITE_DEV_API + "/logs", {
          method: "GET",
          headers: { authorization: `Bearer: ${user?.apikey}` },
        });

        if (res.ok) {
          const logs: Log[] = await res.json();
          setData(logs);
        }
        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            setError(true);
          }
          if (res.status >= 500) {
            setError(true);
          }
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getLogs();
  }, [user?.apikey]);

  if (error) return <h1>Error loading logs</h1>;
  if (loading) return <h1>Loading logs</h1>;
  if (data)
    return (
      <div className="flex items-center justify-center pb-20">
        <table
          className="w-full border-b-2 border-white/20 shadow-xl shadow-black/10 md:w-fit md:border-2"
          dir="ltr"
        >
          <thead dir="ltr">
            <tr className="bg-white/40 backdrop-blur-2xl">
              <th>Username</th>
              <th>Details</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody
            dir="ltr"
            className="[&_tr]:odd:bg-white/10 [&_tr]:even:bg-white/20"
          >
            {data.map((log, idx) => (
              <tr key={idx}>
                <td>{log.username}</td>
                <td dir="ltr">
                  <small>{log.details}</small>
                </td>
                <td>{log.visited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
