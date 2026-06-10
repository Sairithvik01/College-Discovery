"use client";

import {
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  BadgeCheck,
  Building2,
  Users,
} from "lucide-react";
import type { College } from "@/types/college";
import { formatINR, formatLPA } from "@/lib/utils";

interface OverviewTabProps {
  college: College;
}

/**
 * Overview tab content for the college detail page.
 * Displays: description, key stats grid, location, affiliations, and tags.
 */
export function OverviewTab({ college }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          About
        </h3>
        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
          {college.description}
        </p>
      </section>

      {/* Key Stats Grid */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Key Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard
            icon={<Star className="h-5 w-5 text-amber-500 fill-amber-500" />}
            label="Rating"
            value={`${college.rating} / 5`}
            subValue={`${college.reviewCount.toLocaleString("en-IN")} reviews`}
          />
          {college.nirfRanking && (
            <StatCard
              icon={<TrendingUp className="h-5 w-5 text-green-600" />}
              label="NIRF Ranking"
              value={`#${college.nirfRanking}`}
              subValue="All India"
            />
          )}
          <StatCard
            icon={<Calendar className="h-5 w-5 text-blue-600" />}
            label="Established"
            value={college.establishedYear.toString()}
            subValue={`${new Date().getFullYear() - college.establishedYear} years`}
          />
          <StatCard
            icon={<Building2 className="h-5 w-5 text-purple-600" />}
            label="Type"
            value={college.type.charAt(0).toUpperCase() + college.type.slice(1)}
          />
          <StatCard
            icon={
              <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            }
            label="Fees Range"
            value={formatINR(college.feesRange.min)}
            subValue={`to ${formatINR(college.feesRange.max)}`}
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-orange-600" />}
            label="Placement Rate"
            value={`${college.placements.placementRate}%`}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-teal-600" />}
            label="Avg Package"
            value={formatLPA(college.placements.averagePackage)}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-rose-600" />}
            label="Highest Package"
            value={formatLPA(college.placements.highestPackage)}
          />
        </div>
      </section>

      {/* Location */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Location
        </h3>
        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {college.location.city}, {college.location.state}
            </p>
            {college.location.latitude && college.location.longitude && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {college.location.latitude.toFixed(4)}°N, {college.location.longitude.toFixed(4)}°E
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Accreditations & Affiliations
        </h3>
        <div className="flex flex-wrap gap-2">
          {college.affiliations.map((aff) => (
            <span
              key={aff}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400"
            >
              <BadgeCheck className="h-4 w-4" />
              {aff}
            </span>
          ))}
        </div>
      </section>

      {/* Tags */}
      {college.tags.length > 0 && (
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Highlights
          </h3>
          <div className="flex flex-wrap gap-2">
            {college.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// StatCard (internal)
// ============================================================================

function StatCard({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-2">{icon}</div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-0.5 text-lg font-bold text-gray-900 dark:text-gray-100">{value}</p>
      {subValue && (
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{subValue}</p>
      )}
    </div>
  );
}
