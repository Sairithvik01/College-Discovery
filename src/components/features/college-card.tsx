"use client";

import Link from "next/link";
import { MapPin, Star, TrendingUp, GraduationCap, IndianRupee, BadgeCheck, Bookmark } from "lucide-react";
import type { College } from "@/types/college";
import { cn, formatINR, formatLPA } from "@/lib/utils";
import { useAuth } from "@/providers/auth-context";

interface CollegeCardProps {
  college: College;
  /** Optional className for layout overrides */
  className?: string;
}

/**
 * Responsive card displaying a college's key info at a glance.
 * Designed for grid layouts — takes full width of its container.
 * Includes a bookmark button that integrates with AuthContext.
 */
export function CollegeCard({ college, className }: CollegeCardProps) {
  const { toggleSaveCollege, isCollegeSaved } = useAuth();
  const saved = isCollegeSaved(college.id);

  const {
    name,
    type,
    location,
    rating,
    nirfRanking,
    reviewCount,
    courses,
    placements,
    feesRange,
    isFeatured,
    tags,
    affiliations,
  } = college;

  function handleBookmarkClick(e: React.MouseEvent) {
    // Prevent the Link navigation when clicking the bookmark
    e.preventDefault();
    e.stopPropagation();
    toggleSaveCollege(college.id);
  }

  return (
    <Link href={`/colleges/${college.slug}`} className="block">
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300",
        "hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5",
        "dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700",
        className
      )}
    >
      {/* Featured badge + Bookmark button */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        {isFeatured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label={saved ? "Remove from saved" : "Save college"}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
            saved
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "bg-white/80 text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white hover:text-blue-600 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-blue-400"
          )}
        >
          <Bookmark
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              saved && "fill-current scale-110"
            )}
          />
        </button>
      </div>

      {/* Image placeholder / gradient header */}
      <div className="relative h-36 overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-600 to-indigo-700 sm:h-40">
        {/* Type badge */}
        <span className="absolute bottom-3 left-3 inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
          {type}
        </span>
        {/* College initial */}
        <div className="flex h-full items-center justify-center">
          <span className="text-4xl font-bold text-white/30 sm:text-5xl">
            {name.split(" ").map((w) => w[0]).join("").slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title + Location */}
        <div className="mb-3">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-400 sm:text-lg">
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">
              {location.city}, {location.state}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
          {/* Rating */}
          <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 dark:bg-gray-900">
            <Star className="h-3.5 w-3.5 flex-shrink-0 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount.toLocaleString("en-IN")})
            </span>
          </div>

          {/* NIRF Ranking */}
          {nirfRanking && (
            <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 dark:bg-gray-900">
              <TrendingUp className="h-3.5 w-3.5 flex-shrink-0 text-green-600" />
              <span className="text-xs text-gray-600 dark:text-gray-300">
                NIRF <span className="font-semibold text-gray-900 dark:text-gray-100">#{nirfRanking}</span>
              </span>
            </div>
          )}
        </div>

        {/* Courses count + Fees */}
        <div className="mb-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <GraduationCap className="h-4 w-4 flex-shrink-0" />
            <span>{courses.length} Course{courses.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
            <IndianRupee className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="font-semibold text-sm">
              {formatINR(feesRange.min)}
            </span>
            {feesRange.min !== feesRange.max && (
              <span className="text-xs text-gray-500 dark:text-gray-400">onwards</span>
            )}
          </div>
        </div>

        {/* Placement highlight */}
        <div className="mb-3 rounded-lg border border-green-100 bg-green-50/50 px-3 py-2 dark:border-green-900/30 dark:bg-green-950/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Avg. Package</span>
            <span className="font-semibold text-green-700 dark:text-green-400">
              {formatLPA(placements.averagePackage)}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Placement Rate</span>
            <span className="font-semibold text-green-700 dark:text-green-400">
              {placements.placementRate}%
            </span>
          </div>
        </div>

        {/* Affiliations */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {affiliations.slice(0, 4).map((aff) => (
            <span
              key={aff}
              className="inline-flex items-center gap-0.5 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
            >
              <BadgeCheck className="h-3 w-3" />
              {aff}
            </span>
          ))}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 border-t border-gray-100 pt-3 dark:border-gray-800">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
    </Link>
  );
}
