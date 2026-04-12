import { BookmarkX, SearchX } from "lucide-react";
import Link from "next/link";

interface Props {
  type: "no-results" | "no-bookmarks";
}

export default function EmptyState({ type }: Props) {
  if (type === "no-bookmarks") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
          <BookmarkX className="w-7 h-7" style={{ color: "var(--text-tertiary)" }} />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          No bookmarks yet
        </h3>
        <p className="text-sm max-w-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Bookmark concepts you want to revisit later. They&apos;ll show up here
          for quick access.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--violet-500)", color: "var(--bg-base)" }}
        >
          Browse Concepts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
        <SearchX className="w-7 h-7" style={{ color: "var(--text-tertiary)" }} />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        No concepts found
      </h3>
      <p className="text-sm max-w-sm" style={{ color: "var(--text-secondary)" }}>
        Try adjusting your search or filters to find what you&apos;re looking for.
      </p>
    </div>
  );
}
