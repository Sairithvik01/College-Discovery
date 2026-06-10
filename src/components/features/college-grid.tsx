"use client";

import { CollegeCard } from "@/components/features/college-card";
import type { College } from "@/types/college";
import { cn } from "@/lib/utils";

interface CollegeGridProps {
  /** Array of colleges to display */
  colleges: College[];
  /** Loading state — shows skeleton cards */
  isLoading: boolean;
  /** Optional className */
  className?: string;
}

/**
 * Responsive grid layout for college cards.
 * Handles loading skeletons and empty state.
 */
export function CollegeGrid({ colleges, isLoading, className }: CollegeGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
          className
        )}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (colleges.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}

// ============================================================================
// Skeleton Card
// ============================================================================

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 animate-pulse">
      {/* Image placeholder */}
      <div className="h-36 rounded-t-2xl bg-gray-200 dark:bg-gray-800 sm:h-40" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <div className="mb-3 space-y-2">
          <div className="h-5 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-2/5 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Stats */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="h-8 rounded-lg bg-gray-100 dark:bg-gray-900" />
          <div className="h-8 rounded-lg bg-gray-100 dark:bg-gray-900" />
        </div>

        {/* Fees row */}
        <div className="mb-3 flex justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Placement box */}
        <div className="mb-3 h-16 rounded-lg bg-gray-100 dark:bg-gray-900" />

        {/* Tags */}
        <div className="mt-auto flex gap-1.5 border-t border-gray-100 pt-3 dark:border-gray-800">
          <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Empty State
// ============================================================================

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 px-6 text-center dark:border-gray-800">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
        <span className="text-2xl">🎓</span>
      </div>
      <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
        No colleges found
      </h3>
      <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
        Try adjusting your search or filters to discover more colleges.
      </p>
    </div>
  );
}
