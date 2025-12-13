import { formatTimeAgo } from "../../variables/formatData";

export default function PostTime({ time }: { time: string }) {
  return <p>{formatTimeAgo(time)}</p>;
}
