"use client";

import { TrendingUp, Building2, Award, BarChart3 } from "lucide-react";
import type { PlacementStats } from "@/types/college";
import { formatLPA } from "@/lib/utils";

interface PlacementsTabProps {
  placements: PlacementStats;
  collegeName: string;
}

/**
 * Placements tab — displays placement statistics with visual indicators
 * and top recruiters list.
 */
export function PlacementsTab({ placements, collegeName }: PlacementsTabProps) {
  return (
    <div className="space-y-8">
      {/* Headline stats */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Placement Overview
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <PlacementStatCard
            icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
            label="Placement Rate"
            value={`${placements.placementRate}%`}
            variant="primary"
          />
          <PlacementStatCard
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
            label="Average Package"
            value={formatLPA(placements.averagePackage)}
            variant="success"
          />
          <PlacementStatCard
            icon={<Award className="h-5 w-5 text-amber-600" />}
            label="Highest Package"
            value={formatLPA(placements.highestPackage)}
            variant="warning"
          />
          <PlacementStatCard
            icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
            label="Median Package"
            value={formatLPA(placements.medianPackage)}
            variant="purple"
          />
        </div>
      </section>

      {/* Visual placement rate bar */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Placement Rate
        </h3>
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Students placed
            </span>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {placements.placementRate}%
            </span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
              style={{ width: `${placements.placementRate}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {placements.placementRate}% of eligible students from {collegeName} were successfully placed.
          </p>
        </div>
      </section>

      {/* Package comparison */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Package Comparison
        </h3>
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-4">
            <PackageBar
              label="Highest Package"
              value={placements.highestPackage}
              maxValue={placements.highestPackage}
              color="from-amber-400 to-amber-500"
            />
            <PackageBar
              label="Average Package"
              value={placements.averagePackage}
              maxValue={placements.highestPackage}
              color="from-blue-400 to-blue-500"
            />
            <PackageBar
              label="Median Package"
              value={placements.medianPackage}
              maxValue={placements.highestPackage}
              color="from-green-400 to-green-500"
            />
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Top Recruiters
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {placements.topRecruiters.map((recruiter) => (
            <div
              key={recruiter}
              className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:bg-gray-900"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <Building2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {recruiter}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Internal components
// ============================================================================

function PlacementStatCard({
  icon,
  label,
  value,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  variant: "primary" | "success" | "warning" | "purple";
}) {
  const bgMap = {
    primary: "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30",
    success: "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30",
    warning: "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30",
    purple: "border-purple-200 bg-purple-50/50 dark:border-purple-900 dark:bg-purple-950/30",
  };

  return (
    <div className={`rounded-xl border p-4 ${bgMap[variant]}`}>
      <div className="mb-2">{icon}</div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
}

function PackageBar({
  label,
  value,
  maxValue,
  color,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}) {
  const percentage = (value / maxValue) * 100;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {formatLPA(value)}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
