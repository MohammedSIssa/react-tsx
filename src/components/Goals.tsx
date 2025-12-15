import Goal from "./Goal";

export default function Goals({ goals }: { goals: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {goals.map((goal, idx) => (
        <Goal goal={goal} key={idx} />
      ))}
    </div>
  );
}
