"use client";

import { Clock, GraduationCap, IndianRupee } from "lucide-react";
import type { Course } from "@/types/college";
import { formatINR, cn } from "@/lib/utils";

interface CoursesTabProps {
  courses: Course[];
}

/** Level display config */
const LEVEL_CONFIG: Record<
  Course["level"],
  { label: string; color: string; bgColor: string }
> = {
  undergraduate: {
    label: "UG",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
  },
  postgraduate: {
    label: "PG",
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900",
  },
  doctoral: {
    label: "Ph.D",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900",
  },
  diploma: {
    label: "Diploma",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
  },
};

/**
 * Courses tab — displays all courses offered by the college
 * in a responsive table/card layout.
 */
export function CoursesTab({ courses }: CoursesTabProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <GraduationCap className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-700" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No course information available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {courses.length} Course{courses.length !== 1 ? "s" : ""} Offered
        </h3>
        {/* Level badges summary */}
        <div className="flex gap-2">
          {(["undergraduate", "postgraduate", "doctoral", "diploma"] as const)
            .filter((level) => courses.some((c) => c.level === level))
            .map((level) => {
              const config = LEVEL_CONFIG[level];
              const count = courses.filter((c) => c.level === level).length;
              return (
                <span
                  key={level}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                    config.bgColor,
                    config.color
                  )}
                >
                  {config.label} ({count})
                </span>
              );
            })}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Course Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Level
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Duration
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Annual Fees
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {courses.map((course) => {
              const config = LEVEL_CONFIG[course.level];
              return (
                <tr
                  key={course.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {course.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        config.bgColor,
                        config.color
                      )}
                    >
                      {config.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration} Year{course.duration !== 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {formatINR(course.annualFees)}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {" "}/ year
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {courses.map((course) => {
          const config = LEVEL_CONFIG[course.level];
          return (
            <div
              key={course.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {course.name}
                </h4>
                <span
                  className={cn(
                    "inline-flex flex-shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium",
                    config.bgColor,
                    config.color
                  )}
                >
                  {config.label}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {course.duration}yr
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatINR(course.annualFees)}
                  </span>
                  <span className="text-xs">/yr</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
