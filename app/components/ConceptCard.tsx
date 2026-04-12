"use client";

import Link from "next/link";
import type { Concept } from "@/lib/types";
import { getCategoryById } from "@/data";
import { useProgress } from "@/lib/use-progress";
import DifficultyBadge from "./DifficultyBadge";
import { Check, Bookmark } from "lucide-react";

interface Props {
  concept: Concept;
  index?: number;
}

export default function ConceptCard({ concept, index = 0 }: Props) {
  const category = getCategoryById(concept.categoryId);
  const { isCompleted, isBookmarked, toggleConcept, toggleBookmark } =
    useProgress();
  const completed = isCompleted(concept.id);
  const bookmarked = isBookmarked(concept.id);

  return (
    <div
      className={`glass-card group relative overflow-hidden animate-fade-in stagger-${Math.min(index + 1, 9)}`}
    >
      {/* Category color strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: category?.color || "var(--violet-500)" }}
      />

      <div className="flex items-center gap-3 p-4 pl-5">
        {/* Checkbox */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleConcept(concept.id);
          }}
          className={`check-button ${completed ? "checked" : ""}`}
        >
          {completed && <Check className="w-3.5 h-3.5" />}
        </button>

        {/* Main content */}
        <Link href={`/concept/${concept.id}`} className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3
              className="text-sm font-semibold truncate transition-colors"
              style={{
                color: completed ? "var(--text-tertiary)" : "var(--text-primary)",
                textDecoration: completed ? "line-through" : "none",
              }}
            >
              {concept.name}
            </h3>
            <DifficultyBadge difficulty={concept.difficulty} />
          </div>
          <p className="text-xs line-clamp-1" style={{ color: "var(--text-secondary)" }}>
            {concept.definition}
          </p>
        </Link>

        {/* Bookmark */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(concept.id);
          }}
          className={`bookmark-button ${bookmarked ? "active" : ""}`}
        >
          <Bookmark
            className="w-4 h-4"
            fill={bookmarked ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
