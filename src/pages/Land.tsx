import GoalLand from "./Lands/GoalLand";
import WeekLand from "./Lands/WeekLand";
import SpecialLand from "./Lands/SpecialLand";
import StatLand from "./Lands/StatLand";

export default function Land({ type }: { type?: string }) {
  return (
    <div>
      {type === "week" && <WeekLand />}
      {type === "goal" && <GoalLand />}
      {type === "special" && <SpecialLand />}
      {type === "stat" && <StatLand />}
    </div>
  );
}
