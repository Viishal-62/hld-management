"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Bookmark, Home, Search } from "lucide-react";
import { useState, useCallback } from "react";
import { useProgress } from "@/lib/use-progress";
import { getAllConcepts } from "@/data";

export default function Header() {
  const pathname = usePathname();
  const { completedCount } = useProgress();
  const totalConcepts = getAllConcepts().length;
  const progressPct =
    totalConcepts > 0 ? Math.round((completedCount / totalConcepts) * 100) : 0;

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; categoryId: string }[]
  >([]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      const { searchConcepts } = require("@/data");
      const results = searchConcepts(query).slice(0, 6);
      setSearchResults(
        results.map((c: { id: string; name: string; categoryId: string }) => ({
          id: c.id,
          name: c.name,
          categoryId: c.categoryId,
        }))
      );
    },
    []
  );

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--bg-overlay)",
        backdropFilter: "blur(16px)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--violet-500), #7c3aed)" }}>
              <Brain className="w-5 h-5" style={{ color: "var(--bg-base)" }} />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                HLD Brain
              </span>
              <div className="flex items-center gap-2 -mt-0.5">
                <div className="progress-bar-track w-16 h-1">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>
                  {progressPct}%
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: pathname === "/" ? "var(--text-primary)" : "var(--text-secondary)",
                background: pathname === "/" ? "var(--bg-surface)" : "transparent",
              }}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              href="/bookmarks"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: pathname === "/bookmarks" ? "var(--text-primary)" : "var(--text-secondary)",
                background: pathname === "/bookmarks" ? "var(--bg-surface)" : "transparent",
              }}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Bookmarks</span>
            </Link>

            {/* Search Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 p-3 rounded-xl animate-fade-in"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                  <input
                    type="text"
                    placeholder="Search concepts..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                    style={{ paddingLeft: "16px" }}
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {searchResults.map((r) => (
                        <Link
                          key={r.id}
                          href={`/concept/${r.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="block px-3 py-2 rounded-lg text-sm transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {r.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.length >= 2 && searchResults.length === 0 && (
                    <p className="text-xs mt-2 px-1" style={{ color: "var(--text-tertiary)" }}>
                      No concepts found
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
