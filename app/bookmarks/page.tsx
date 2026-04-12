"use client";

import Header from "../components/Header";
import ConceptCard from "../components/ConceptCard";
import EmptyState from "../components/EmptyState";
import { getConceptById } from "@/data";
import { useProgress } from "@/lib/use-progress";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const { progress, isLoaded } = useProgress();

  const bookmarkedConcepts = progress.bookmarked
    .map((id) => getConceptById(id))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(251, 191, 36, 0.1)", border: "1px solid rgba(251, 191, 36, 0.2)" }}
            >
              <Bookmark className="w-5 h-5" style={{ color: "var(--amber)" }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Bookmarks</h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {bookmarkedConcepts.length} concept{bookmarkedConcepts.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {/* Content */}
          {!isLoaded ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "var(--bg-raised)" }} />
              ))}
            </div>
          ) : bookmarkedConcepts.length > 0 ? (
            <div className="space-y-2">
              {bookmarkedConcepts.map((concept, i) =>
                concept ? <ConceptCard key={concept.id} concept={concept} index={i} /> : null
              )}
            </div>
          ) : (
            <EmptyState type="no-bookmarks" />
          )}
        </div>
      </main>
    </>
  );
}
