"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  TrendingUp,
  BadgeCheck,
  GraduationCap,
  BarChart3,
  Info,
  Bookmark,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AuthModal } from "@/components/features/auth-modal";
import { OverviewTab } from "@/components/features/detail/overview-tab";
import { CoursesTab } from "@/components/features/detail/courses-tab";
import { PlacementsTab } from "@/components/features/detail/placements-tab";
import { useCollegeDetail } from "@/hooks/use-colleges";
import { useAuth } from "@/providers/auth-context";
import { cn, formatINR } from "@/lib/utils";

interface CollegeDetailPageProps {
  collegeId: string;
}

/**
 * College detail page — shows full college info organized in tabs.
 * Uses useCollegeDetail hook with slug-based lookup.
 */
export function CollegeDetailPage({ collegeId }: CollegeDetailPageProps) {
  const { data: college, isLoading, isError, error } = useCollegeDetail(collegeId);
  const { toggleSaveCollege, isCollegeSaved } = useAuth();
  const saved = college ? isCollegeSaved(college.id) : false;

  // ── Loading state ─────────────────────────────────────────
  if (isLoading) {
    return <DetailSkeleton />;
  }

  // ── Error state ───────────────────────────────────────────
  if (isError || !college) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="text-center">
          <div className="mb-4 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
            <span className="text-2xl">😕</span>
          </div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            College Not Found
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {error ?? "The college you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Listing
          </Link>
        </div>
      </div>
    );
  }

  // ── Success state ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Auth Modal */}
      <AuthModal />

      {/* ── Top bar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg p-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-5 w-px bg-gray-200 dark:bg-gray-800" />
          <h1 className="flex-1 truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
            {college.name}
          </h1>
          {/* Save / Bookmark button */}
          <button
            type="button"
            onClick={() => toggleSaveCollege(college.id)}
            aria-label={saved ? "Remove from saved" : "Save college"}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200",
              saved
                ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
            )}
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </header>

      {/* ── Hero section ───────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -right-8 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Left: Name + meta */}
            <div className="max-w-2xl">
              {/* Type badge */}
              <span className="mb-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
                {college.type}
              </span>

              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {college.name}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {college.location.city}, {college.location.state}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {college.rating} ({college.reviewCount.toLocaleString("en-IN")} reviews)
                </span>
                {college.nirfRanking && (
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    NIRF #{college.nirfRanking}
                  </span>
                )}
              </div>

              {/* Affiliations row */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {college.affiliations.map((aff) => (
                  <span
                    key={aff}
                    className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    <BadgeCheck className="h-3 w-3" />
                    {aff}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Quick stats */}
            <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end">
              <div className="rounded-xl bg-white/15 px-4 py-2.5 text-center backdrop-blur-sm">
                <p className="text-xs text-white/70">Starts from</p>
                <p className="text-lg font-bold text-white">
                  {formatINR(college.feesRange.min)}
                </p>
              </div>
              <div className="rounded-xl bg-white/15 px-4 py-2.5 text-center backdrop-blur-sm">
                <p className="text-xs text-white/70">Avg Package</p>
                <p className="text-lg font-bold text-white">
                  ₹{college.placements.averagePackage} LPA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabbed content ─────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 w-full justify-start sm:w-auto">
            <TabsTrigger value="overview" className="gap-1.5">
              <Info className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-1.5">
              <GraduationCap className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="placements" className="gap-1.5">
              <BarChart3 className="h-4 w-4" />
              Placements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab college={college} />
          </TabsContent>

          <TabsContent value="courses">
            <CoursesTab courses={college.courses} />
          </TabsContent>

          <TabsContent value="placements">
            <PlacementsTab
              placements={college.placements}
              collegeName={college.name}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ============================================================================
// Loading Skeleton
// ============================================================================

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      {/* Sticky bar skeleton */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-px bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </header>

      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="space-y-3">
            <div className="h-6 w-24 rounded-full bg-white/20" />
            <div className="h-10 w-3/4 rounded bg-white/20" />
            <div className="h-5 w-1/2 rounded bg-white/20" />
            <div className="flex gap-2">
              <div className="h-6 w-12 rounded bg-white/20" />
              <div className="h-6 w-14 rounded bg-white/20" />
              <div className="h-6 w-10 rounded bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex gap-2">
          <div className="h-9 w-24 rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-9 w-24 rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-9 w-24 rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-4">
          <div className="h-5 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-4/6 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
