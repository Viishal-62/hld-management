"use client";

import Link from "next/link";
import type { Concept } from "@/lib/types";
import { getCategoryById, getConceptById, getConceptsByCategory } from "@/data";
import { useProgress } from "@/lib/use-progress";
import DifficultyBadge from "./DifficultyBadge";
import FlowDiagram from "./FlowDiagram";
import {
  Check,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Target,
  ArrowUpRight,
  Building2,
  Link2,
  Zap,
  BookOpen,
  GitMerge,
  Glasses
} from "lucide-react";
import { useEffect, useMemo } from "react";

interface Props {
  concept: Concept;
}

export default function ConceptDetail({ concept }: Props) {
  const category = getCategoryById(concept.categoryId);
  const {
    isCompleted,
    isBookmarked,
    toggleConcept,
    toggleBookmark,
    setLastVisited,
  } = useProgress();
  const completed = isCompleted(concept.id);
  const bookmarked = isBookmarked(concept.id);

  useEffect(() => {
    setLastVisited(concept.id);
  }, [concept.id, setLastVisited]);

  const siblings = useMemo(
    () => getConceptsByCategory(concept.categoryId),
    [concept.categoryId]
  );
  const currentIdx = siblings.findIndex((c) => c.id === concept.id);
  const prev = currentIdx > 0 ? siblings[currentIdx - 1] : null;
  const next = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

  return (
    <div className="animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        <Link href="/" className="transition-colors hover:opacity-80">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/category/${concept.categoryId}`}
          className="transition-colors hover:opacity-80"
          style={{ color: category?.color }}
        >
          {category?.icon} {category?.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span style={{ color: "var(--text-primary)" }} className="font-medium truncate">
          {concept.name}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {concept.name}
            </h1>
            <DifficultyBadge difficulty={concept.difficulty} />
          </div>
          <p className="max-w-3xl leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
            {concept.definition}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => toggleBookmark(concept.id)}
            className={`bookmark-button p-2 rounded-lg ${bookmarked ? "active" : ""}`}
            style={{ border: "1px solid var(--border-default)" }}
          >
            <Bookmark className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={() => toggleConcept(concept.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: completed ? "var(--violet-500)" : "transparent",
              color: completed ? "var(--bg-base)" : "var(--text-secondary)",
              border: completed ? "1px solid var(--violet-500)" : "1px solid var(--border-default)",
            }}
          >
            <Check className="w-4 h-4" />
            {completed ? "Completed" : "Mark Complete"}
          </button>
        </div>
      </div>

      {/* The Story */}
      <div className="section-card mb-4" style={{ background: "rgba(139, 92, 246, 0.03)" }}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5" style={{ color: "var(--violet-400)" }} />
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
            The Story
          </h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
          {concept.story}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Why it Matters */}
        <div className="section-card lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4" style={{ color: category?.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Why It Matters
            </h2>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {concept.importance}
          </p>
        </div>

        {/* When to Use */}
        <div className="section-card">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4" style={{ color: category?.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              When to Use
            </h2>
          </div>
          <ul className="space-y-2">
            {concept.whenToUse.map((item) => (
              <li key={item} className="text-xs leading-relaxed pl-3 relative" style={{ color: "var(--text-secondary)" }}>
                <span className="absolute left-0 text-lg leading-none" style={{ color: category?.color, top: "-2px" }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* How It Works Flow */}
        <div className="section-card">
          <div className="flex items-center gap-2 mb-5">
            <GitMerge className="w-4 h-4" style={{ color: "var(--emerald)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              How It Works
            </h2>
          </div>
          <FlowDiagram steps={concept.howItWorks} accentColor={category?.color} />
        </div>

        {/* Deep Dive */}
        <div className="section-card">
          <div className="flex items-center gap-2 mb-5">
            <Glasses className="w-4 h-4" style={{ color: "var(--amber)" }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Deep Dive
            </h2>
          </div>
          <div className="space-y-6">
            {concept.deepDive.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {section.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tradeoffs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="section-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--emerald)" }}>
            ✓ Advantages
          </h2>
          <ul className="space-y-2.5">
            {concept.tradeoffs.pros.map((pro) => (
              <li key={pro} className="pro-item text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="section-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--rose)" }}>
            ✗ Tradeoffs
          </h2>
          <ul className="space-y-2.5">
            {concept.tradeoffs.cons.map((con) => (
              <li key={con} className="con-item text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Use Cases & Real World */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="section-card">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpRight className="w-4 h-4" style={{ color: category?.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Use Cases
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {concept.useCases.map((uc) => (
              <div
                key={uc}
                className="flex items-start gap-2 p-3 rounded-lg"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border-default)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: category?.color }} />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{uc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4" style={{ color: category?.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Real-World Everywhere
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {concept.realWorldExamples.map((ex) => (
              <div key={ex.company} className="p-4 rounded-xl" style={{ background: "var(--bg-base)", border: "1px solid var(--border-default)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: category?.color, color: "var(--bg-base)" }}
                  >
                    {ex.company.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {ex.company}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {ex.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Concepts */}
      {concept.relatedConcepts.length > 0 && (
        <div className="section-card mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-4 h-4" style={{ color: category?.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Related Concepts
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {concept.relatedConcepts.map((relId) => {
              const rel = getConceptById(relId);
              if (!rel) return null;
              const relCat = getCategoryById(rel.categoryId);
              return (
                <Link
                  key={relId}
                  href={`/concept/${relId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:scale-105"
                  style={{
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                    background: "var(--bg-surface)"
                  }}
                >
                  <span style={{ color: relCat?.color }}>{relCat?.icon}</span>
                  {rel.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Takeaway */}
      <div className="section-card mb-8" style={{ borderLeft: `3px solid ${category?.color}` }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4" style={{ color: category?.color }} />
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
            Key Takeaway
          </h2>
        </div>
        <p className="text-sm leading-relaxed font-medium italic" style={{ color: "var(--text-primary)" }}>
          &ldquo;{concept.keyTakeaway}&rdquo;
        </p>
      </div>

      {/* Previous / Next */}
      <div className="flex items-center justify-between gap-4 pb-8">
        {prev ? (
          <Link
            href={`/concept/${prev.id}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all group flex-1 hover:bg-[var(--bg-surface-hover)]"
            style={{ border: "1px solid var(--border-default)", background: "var(--bg-raised)" }}
          >
            <ChevronLeft className="w-4 h-4 transition-colors" style={{ color: "var(--text-tertiary)" }} />
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>Previous</span>
              <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{prev.name}</p>
            </div>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/concept/${next.id}`}
            className="flex items-center justify-end gap-2 px-4 py-3 rounded-xl transition-all group flex-1 text-right hover:bg-[var(--bg-surface-hover)]"
            style={{ border: "1px solid var(--border-default)", background: "var(--bg-raised)" }}
          >
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>Next</span>
              <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{next.name}</p>
            </div>
            <ChevronRight className="w-4 h-4 transition-colors" style={{ color: "var(--text-tertiary)" }} />
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
