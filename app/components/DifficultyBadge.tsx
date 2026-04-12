import type { Difficulty } from "@/lib/types";

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  return (
    <span className={`badge badge-${difficulty}`}>
      {difficulty}
    </span>
  );
}
