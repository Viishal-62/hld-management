"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { getConceptsByCategory } from "@/data";
import { useProgress } from "@/lib/use-progress";
import { ChevronRight } from "lucide-react";

interface Props {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: Props) {
  const concepts = getConceptsByCategory(category.id);
  const { progress } = useProgress();
  const completedInCategory = concepts.filter((c) =>
    progress.completedConcepts.includes(c.id)
  ).length;
  const total = concepts.length;
  const pct = total > 0 ? Math.round((completedInCategory / total) * 100) : 0;

  return (
    <Link href={`/category/${category.id}`}>
      <div
        className={`glass-card category-glow p-5 cursor-pointer group animate-fade-in-up stagger-${index + 1}`}
        style={{ "--glow-color": category.color } as React.CSSProperties}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${category.color}15` }}
          >
            {category.icon}
          </div>
          <ChevronRight
            className="w-4 h-4 group-hover:translate-x-0.5 transition-all"
            style={{ color: "var(--text-tertiary)" }}
          />
        </div>

        <h3 className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          {category.name}
        </h3>
        <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {category.description}
        </p>

        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>
            {completedInCategory}/{total} completed
          </span>
          <span className="text-[11px] font-bold" style={{ color: category.color }}>
            {pct}%
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill animate-progress-fill"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${category.color}, ${category.color}bb)`,
            }}
          />
        </div>
      </div>
    </Link>
  );
}
