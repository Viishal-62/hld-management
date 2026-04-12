"use client";

import Header from "./components/Header";
import CategoryCard from "./components/CategoryCard";
import ProgressRing from "./components/ProgressRing";
import ConceptCard from "./components/ConceptCard";
import { categories, getAllConcepts, getConceptById } from "@/data";
import { useProgress } from "@/lib/use-progress";
import { Clock, Bookmark } from "lucide-react";

export default function Home() {
  const { progress, completedCount, isLoaded } = useProgress();
  const allConcepts = getAllConcepts();
  const totalConcepts = allConcepts.length;
  const progressPct =
    totalConcepts > 0 ? Math.round((completedCount / totalConcepts) * 100) : 0;

  const lastVisitedConcept = progress.lastVisited
    ? getConceptById(progress.lastVisited)
    : null;

  const bookmarkedConcepts = progress.bookmarked
    .map((id) => getConceptById(id))
    .filter(Boolean)
    .slice(0, 3);

  const beginnerCount = allConcepts.filter((c) => c.difficulty === "beginner").length;
  const intermediateCount = allConcepts.filter((c) => c.difficulty === "intermediate").length;
  const advancedCount = allConcepts.filter((c) => c.difficulty === "advanced").length;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 animate-fade-in">
            <div className="flex-1">
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-3 inline-block"
                style={{ color: "var(--violet-400)" }}
              >
                System Design Mastery
              </span>
              <h1
                className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Master High-Level
                <br />
                System Design
              </h1>
              <p className="max-w-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Learn the core concepts behind scalable, reliable, and
                performant systems. Track your progress as you build your system
                design expertise.
              </p>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {totalConcepts}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    Concepts
                  </div>
                </div>
                <div className="w-px h-8" style={{ background: "var(--border-default)" }} />
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {categories.length}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    Categories
                  </div>
                </div>
                <div className="w-px h-8" style={{ background: "var(--border-default)" }} />
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>3</div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    Levels
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Ring */}
            {isLoaded && (
              <div className="flex flex-col items-center gap-3 animate-fade-in">
                <ProgressRing value={progressPct} size={140} label="complete" />
                <div className="text-center">
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {completedCount} of {totalConcepts} concepts
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Difficulty breakdown */}
          <div className="grid grid-cols-3 gap-3 mb-10 animate-fade-in">
            <div className="section-card flex items-center gap-3 !p-3.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--emerald)" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {beginnerCount}
                </div>
                <div className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Beginner</div>
              </div>
            </div>
            <div className="section-card flex items-center gap-3 !p-3.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--amber)" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {intermediateCount}
                </div>
                <div className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Intermediate</div>
              </div>
            </div>
            <div className="section-card flex items-center gap-3 !p-3.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--rose)" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {advancedCount}
                </div>
                <div className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Advanced</div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mb-12">
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Explore Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} index={i} />
              ))}
            </div>
          </div>

          {/* Bottom row */}
          {isLoaded && (lastVisitedConcept || bookmarkedConcepts.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {lastVisitedConcept && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                    <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                      Continue Learning
                    </h2>
                  </div>
                  <ConceptCard concept={lastVisitedConcept} />
                </div>
              )}
              {bookmarkedConcepts.length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Bookmark className="w-4 h-4" style={{ color: "var(--amber)" }} />
                    <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                      Bookmarked
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {bookmarkedConcepts.map((c, i) =>
                      c ? <ConceptCard key={c.id} concept={c} index={i} /> : null
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
