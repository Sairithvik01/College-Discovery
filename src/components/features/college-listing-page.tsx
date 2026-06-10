"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, UserCircle, LogOut, Bookmark } from "lucide-react";
import { SearchInput } from "@/components/common/search-input";
import { CollegeFilters, type FilterValues } from "@/components/features/college-filters";
import { CollegeGrid } from "@/components/features/college-grid";
import { AuthModal } from "@/components/features/auth-modal";
import { useColleges } from "@/hooks/use-colleges";
import { useDebounce } from "@/hooks/use-debounce";
import { useAuth } from "@/providers/auth-context";
import { cn } from "@/lib/utils";

/**
 * Main college listing page content.
 * Orchestrates search, filters, grid display, and auth UI.
 *
 * Architecture:
 * - Raw search input → useDebounce(300ms) → debouncedSearch → useColleges
 * - Filter state is managed locally and passed to useColleges
 * - Mobile: filters toggle via a sliding panel
 * - Auth state comes from AuthContext
 */
export function CollegeListingPage() {
  // ── Auth ──────────────────────────────────────────────────
  const { isAuthenticated, user, savedCollegeIds, openAuthModal, logout } = useAuth();

  // ── Search state ──────────────────────────────────────────
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  // ── Filter state ──────────────────────────────────────────
  const [filters, setFilters] = useState<FilterValues>({
    states: [],
    feesMax: undefined,
  });

  // ── Mobile filter panel toggle ────────────────────────────
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ── Build query params for the hook ───────────────────────
  const hookFilters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      states: filters.states.length > 0 ? filters.states : undefined,
      feesMax: filters.feesMax,
      pageSize: 12,
    }),
    [debouncedSearch, filters]
  );

  // ── Fetch data ────────────────────────────────────────────
  const { data, isLoading, isError, error, refetch } = useColleges(hookFilters);

  // ── Active filter chips ───────────────────────────────────
  const activeFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];

    filters.states.forEach((state) => {
      chips.push({
        label: state,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            states: prev.states.filter((s) => s !== state),
          })),
      });
    });

    if (filters.feesMax !== undefined) {
      chips.push({
        label: `Max ₹${(filters.feesMax / 100000).toFixed(1)}L`,
        onRemove: () => setFilters((prev) => ({ ...prev, feesMax: undefined })),
      });
    }

    return chips;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Auth Modal (rendered once, controlled by context) */}
      <AuthModal />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo / Title */}
          <h1 className="hidden text-lg font-bold text-gray-900 dark:text-gray-100 sm:block">
            <span className="text-blue-600">College</span>Discovery
          </h1>

          {/* Search */}
          <SearchInput
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by name, city, state, or course..."
            className="flex-1 max-w-xl"
          />

          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors lg:hidden",
              mobileFiltersOpen
                ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterChips.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {activeFilterChips.length}
              </span>
            )}
          </button>

          {/* ── Auth controls ──────────────────────────────── */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Saved count badge */}
              {savedCollegeIds.length > 0 && (
                <div className="hidden items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 sm:flex dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                  <Bookmark className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
                  {savedCollegeIds.length} Saved
                </div>
              )}

              {/* User menu */}
              <div className="flex items-center gap-2">
                <div className="hidden flex-col items-end sm:flex">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.name}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  aria-label="Sign out"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:border-red-900 dark:hover:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={openAuthModal}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:border-gray-700"
            >
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Active filter chips */}
        {activeFilterChips.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Active filters:
            </span>
            {activeFilterChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
              >
                {chip.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilters({ states: [], feesMax: undefined })}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* ── Desktop sidebar ──────────────────────────── */}
          <div className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-20">
              <CollegeFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>

          {/* ── Mobile filter panel ──────────────────────── */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setMobileFiltersOpen(false)}
              />
              {/* Panel */}
              <div className="fixed bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <CollegeFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Show Results
                  {data?.pagination.totalCount !== undefined &&
                    ` (${data.pagination.totalCount})`}
                </button>
              </div>
            </div>
          )}

          {/* ── Results area ─────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLoading ? (
                  <span className="inline-block h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {data?.colleges.length ?? 0}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {data?.pagination.totalCount ?? 0}
                    </span>{" "}
                    colleges
                  </>
                )}
              </p>
            </div>

            {/* Error state */}
            {isError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {error ?? "Something went wrong. Please try again."}
                </p>
                <button
                  type="button"
                  onClick={refetch}
                  className="mt-2 text-sm font-medium text-red-700 underline hover:no-underline dark:text-red-400"
                >
                  Retry
                </button>
              </div>
            )}

            {/* College grid */}
            <CollegeGrid
              colleges={data?.colleges ?? []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
