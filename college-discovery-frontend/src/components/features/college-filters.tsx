"use client";

import { useState } from "react";
import { SlidersHorizontal, MapPin, IndianRupee, RotateCcw, ChevronDown, X } from "lucide-react";
import { cn, formatINR } from "@/lib/utils";
import { getUniqueStates, getFeesRangeBounds } from "@/lib/mockData";

// ============================================================================
// Types
// ============================================================================

export interface FilterValues {
  states: string[];
  feesMax: number | undefined;
}

interface CollegeFiltersProps {
  /** Current filter values */
  filters: FilterValues;
  /** Called when any filter changes */
  onFiltersChange: (filters: FilterValues) => void;
  /** Optional className for the container */
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const AVAILABLE_STATES = getUniqueStates();
const FEES_BOUNDS = getFeesRangeBounds();

/** Preset fee steps for the range selector */
const FEE_PRESETS = [100000, 200000, 500000, 1000000, 2000000, 3000000];

// ============================================================================
// Component
// ============================================================================

/**
 * Sidebar filter panel for the college listing.
 * Supports:
 * - Multi-select state filter with checkboxes
 * - Max fees slider with preset options
 * - Reset all filters
 *
 * Designed to be placed in a sidebar on desktop and a Sheet on mobile.
 */
export function CollegeFilters({ filters, onFiltersChange, className }: CollegeFiltersProps) {
  const [stateExpanded, setStateExpanded] = useState(true);
  const [feesExpanded, setFeesExpanded] = useState(true);

  const activeFilterCount =
    filters.states.length + (filters.feesMax !== undefined ? 1 : 0);

  function handleStateToggle(state: string) {
    const next = filters.states.includes(state)
      ? filters.states.filter((s) => s !== state)
      : [...filters.states, state];
    onFiltersChange({ ...filters, states: next });
  }

  function handleFeesMaxChange(value: number | undefined) {
    onFiltersChange({ ...filters, feesMax: value });
  }

  function handleReset() {
    onFiltersChange({ states: [], feesMax: undefined });
  }

  return (
    <aside className={cn("flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* Location filter */}
      <div className="border-b border-gray-200 py-4 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setStateExpanded(!stateExpanded)}
          className="flex w-full items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            Location
            {filters.states.length > 0 && (
              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                {filters.states.length}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              stateExpanded && "rotate-180"
            )}
          />
        </button>

        {stateExpanded && (
          <div className="mt-3 space-y-1.5">
            {AVAILABLE_STATES.map((state) => {
              const isChecked = filters.states.includes(state);
              return (
                <label
                  key={state}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                    "hover:bg-gray-50 dark:hover:bg-gray-900",
                    isChecked && "bg-blue-50 dark:bg-blue-950/30"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleStateToggle(state)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
                  />
                  <span
                    className={cn(
                      "text-gray-700 dark:text-gray-300",
                      isChecked && "font-medium text-blue-700 dark:text-blue-400"
                    )}
                  >
                    {state}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Max Fees filter */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => setFeesExpanded(!feesExpanded)}
          className="flex w-full items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          <span className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            Max Annual Fees
            {filters.feesMax !== undefined && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeesMaxChange(undefined);
                }}
                className="rounded-full p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear fees filter"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              feesExpanded && "rotate-180"
            )}
          />
        </button>

        {feesExpanded && (
          <div className="mt-3 space-y-3">
            {/* Current value display */}
            <div className="rounded-lg bg-gray-50 px-3 py-2 text-center dark:bg-gray-900">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {filters.feesMax !== undefined
                  ? `Up to ${formatINR(filters.feesMax)}`
                  : "Any budget"}
              </span>
            </div>

            {/* Range input */}
            <input
              type="range"
              min={FEES_BOUNDS.min}
              max={FEES_BOUNDS.max}
              step={10000}
              value={filters.feesMax ?? FEES_BOUNDS.max}
              onChange={(e) => handleFeesMaxChange(Number(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
              aria-label="Maximum annual fees"
            />

            {/* Range labels */}
            <div className="flex justify-between text-[11px] text-gray-400 dark:text-gray-500">
              <span>{formatINR(FEES_BOUNDS.min)}</span>
              <span>{formatINR(FEES_BOUNDS.max)}</span>
            </div>

            {/* Preset chips */}
            <div className="flex flex-wrap gap-1.5">
              {FEE_PRESETS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleFeesMaxChange(amount)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                    filters.feesMax === amount
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  )}
                >
                  {formatINR(amount)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
