"use client";

import { use, useState, useMemo } from "react";
import Header from "../../components/Header";
import ConceptCard from "../../components/ConceptCard";
import EmptyState from "../../components/EmptyState";
import { getCategoryById, getConceptsByCategory } from "@/data";
import { useProgress } from "@/lib/use-progress";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Difficulty } from "@/lib/types";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const category = getCategoryById(id);
  const allConcepts = getConceptsByCategory(id);
  const { progress } = useProgress();

  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");

  const filteredConcepts = useMemo(() => {
    if (difficultyFilter === "all") return allConcepts;
    return allConcepts.filter((c) => c.difficulty === difficultyFilter);
  }, [allConcepts, difficultyFilter]);

  const completedInCategory = allConcepts.filter((c) =>
    progress.completedConcepts.includes(c.id)
  ).length;
  const pct = allConcepts.length > 0 ? Math.round((completedInCategory / allConcepts.length) * 100) : 0;

  if (!category) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Category Not Found
            </h1>
            <Link href="/" style={{ color: "var(--violet-500)" }} className="text-sm hover:underline">
              Go Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm transition-colors mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            <ChevronLeft className="w-4 h-4" />
            All Categories
          </Link>

          {/* Category Header */}
          <div className="animate-fade-in-up mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: `${category.color}15` }}
              >
                {category.icon}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {category.name}
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {category.description}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3 mt-4">
              <div className="progress-bar-track flex-1">
                <div
                  className="progress-bar-fill animate-progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${category.color}, ${category.color}bb)`,
                  }}
                />
              </div>
              <span className="text-sm font-medium" style={{ color: category.color }}>
                {completedInCategory}/{allConcepts.length}
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`filter-pill ${difficultyFilter === d ? "active" : ""}`}
              >
                {d === "all" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>

          {/* Concepts List */}
          {filteredConcepts.length > 0 ? (
            <div className="space-y-2">
              {filteredConcepts.map((concept, i) => (
                <ConceptCard key={concept.id} concept={concept} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState type="no-results" />
          )}
        </div>
      </main>
    </>
  );
}
