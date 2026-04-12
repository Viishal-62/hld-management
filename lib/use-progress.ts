"use client";

import { useCallback, useEffect, useState } from "react";
import type { UserProgress } from "./types";

const STORAGE_KEY = "hld-brain-progress";

const defaultProgress: UserProgress = {
  completedConcepts: [],
  lastVisited: null,
  bookmarked: [],
};

function loadProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProgress, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return defaultProgress;
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setIsLoaded(true);
  }, []);

  const toggleConcept = useCallback((conceptId: string) => {
    setProgress((prev) => {
      const completed = prev.completedConcepts.includes(conceptId)
        ? prev.completedConcepts.filter((id) => id !== conceptId)
        : [...prev.completedConcepts, conceptId];
      const next = { ...prev, completedConcepts: completed };
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((conceptId: string) => {
    setProgress((prev) => {
      const bookmarked = prev.bookmarked.includes(conceptId)
        ? prev.bookmarked.filter((id) => id !== conceptId)
        : [...prev.bookmarked, conceptId];
      const next = { ...prev, bookmarked };
      saveProgress(next);
      return next;
    });
  }, []);

  const setLastVisited = useCallback((conceptId: string) => {
    setProgress((prev) => {
      const next = { ...prev, lastVisited: conceptId };
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (conceptId: string) => progress.completedConcepts.includes(conceptId),
    [progress.completedConcepts]
  );

  const isBookmarked = useCallback(
    (conceptId: string) => progress.bookmarked.includes(conceptId),
    [progress.bookmarked]
  );

  const completedCount = progress.completedConcepts.length;

  return {
    progress,
    isLoaded,
    toggleConcept,
    toggleBookmark,
    setLastVisited,
    isCompleted,
    isBookmarked,
    completedCount,
  };
}
