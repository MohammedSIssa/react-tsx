export default function Goal({ goal }: { goal: string }) {
  const isDone = goal.startsWith("✅");
  return (
    <h1
      className={`${isDone ? "border-green-100/40 bg-green-500/40 text-green-100" : "border-white/10 bg-white/10"} rounded-lg border-2 p-2 px-3`}
    >
      {goal}
    </h1>
  );
}
