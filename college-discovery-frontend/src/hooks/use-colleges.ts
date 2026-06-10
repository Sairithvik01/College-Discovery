"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { College, CollegeListResponse } from "@/types/college";
import { mockColleges } from "@/lib/mockData";

// ============================================================================
// Types for the hook's return value
// ============================================================================

interface UseCollegesFilters {
  /** Free-text search query */
  search?: string;
  /** Filter by college type(s) */
  types?: string[];
  /** Filter by state(s) */
  states?: string[];
  /** Min annual fees (lowest course fee) */
  feesMin?: number;
  /** Max annual fees (highest course fee) */
  feesMax?: number;
  /** Minimum rating (0–5) */
  minRating?: number;
  /** Sort field */
  sortBy?: "name" | "rating" | "fees" | "nirfRanking";
  /** Sort direction */
  sortOrder?: "asc" | "desc";
  /** Current page (1-indexed) */
  page?: number;
  /** Items per page */
  pageSize?: number;
}

interface UseCollegesReturn {
  /** Filtered, sorted, paginated college data */
  data: CollegeListResponse | null;
  /** True during the initial or subsequent fetch */
  isLoading: boolean;
  /** True if the simulated fetch failed */
  isError: boolean;
  /** Error message if isError is true */
  error: string | null;
  /** Re-trigger the fetch manually */
  refetch: () => void;
}

// ============================================================================
// Simulated API fetch (mirrors a real backend)
// ============================================================================

/**
 * Simulates a paginated, filterable API call with a realistic network delay.
 * In production, replace this with a real `fetch` call to your API.
 */
async function fetchCollegesMock(
  filters: UseCollegesFilters,
  signal?: AbortSignal
): Promise<CollegeListResponse> {
  const {
    search = "",
    types = [],
    states = [],
    feesMin,
    feesMax,
    minRating,
    sortBy = "rating",
    sortOrder = "desc",
    page = 1,
    pageSize = 6,
  } = filters;

  // Simulate network latency (300–800ms)
  const delay = Math.random() * 500 + 300;
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, delay);
    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

  // Simulate occasional errors (5% chance) for testing error states
  // Uncomment the lines below to test error handling:
  // if (Math.random() < 0.05) {
  //   throw new Error("Simulated server error — please try again.");
  // }

  let filtered = [...mockColleges];

  // --- Search ---
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.city.toLowerCase().includes(q) ||
        c.location.state.toLowerCase().includes(q) ||
        c.courses.some((course) => course.name.toLowerCase().includes(q)) ||
        c.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  // --- Filter by type ---
  if (types.length > 0) {
    filtered = filtered.filter((c) => types.includes(c.type));
  }

  // --- Filter by state ---
  if (states.length > 0) {
    filtered = filtered.filter((c) => states.includes(c.location.state));
  }

  // --- Filter by fees range ---
  if (feesMin !== undefined) {
    filtered = filtered.filter((c) => c.feesRange.max >= feesMin);
  }
  if (feesMax !== undefined) {
    filtered = filtered.filter((c) => c.feesRange.min <= feesMax);
  }

  // --- Filter by minimum rating ---
  if (minRating !== undefined) {
    filtered = filtered.filter((c) => c.rating >= minRating);
  }

  // --- Sort ---
  filtered.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "rating":
        comparison = a.rating - b.rating;
        break;
      case "fees":
        comparison = a.feesRange.min - b.feesRange.min;
        break;
      case "nirfRanking":
        // Colleges without ranking go to the end
        comparison = (a.nirfRanking ?? 999) - (b.nirfRanking ?? 999);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === "desc" ? -comparison : comparison;
  });

  // --- Paginate ---
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);

  return {
    colleges: paginated,
    pagination: {
      currentPage: safePage,
      totalPages,
      totalCount,
      pageSize,
    },
  };
}

// ============================================================================
// Hook: useColleges
// ============================================================================

/**
 * Custom hook to fetch, filter, sort, and paginate colleges.
 *
 * Demonstrates proper API state handling:
 * - Loading state with abort on unmount/re-fetch
 * - Error state with retry capability
 * - Stable references via useCallback
 * - Request deduplication via AbortController
 *
 * In production, replace this with a TanStack React Query wrapper:
 *   `useQuery({ queryKey: ['colleges', filters], queryFn: ... })`
 */
export function useColleges(filters: UseCollegesFilters = {}): UseCollegesReturn {
  const [data, setData] = useState<CollegeListResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Keep an AbortController ref to cancel in-flight requests
  const abortControllerRef = useRef<AbortController | null>(null);
  // Track the current filter fingerprint to avoid stale updates
  const filterKeyRef = useRef<string>("");

  const fetchData = useCallback(async (currentFilters: UseCollegesFilters) => {
    // Abort any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const filterKey = JSON.stringify(currentFilters);
    filterKeyRef.current = filterKey;

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await fetchCollegesMock(currentFilters, controller.signal);

      // Guard against stale responses
      if (filterKeyRef.current === filterKey && !controller.signal.aborted) {
        setData(response);
        setIsLoading(false);
      }
    } catch (err) {
      // Don't treat aborted requests as errors
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      if (filterKeyRef.current === filterKey) {
        setIsError(true);
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        setIsLoading(false);
      }
    }
  }, []);

  // Fetch on mount and whenever filters change
  useEffect(() => {
    fetchData(filters);

    return () => {
      // Cleanup: abort on unmount or filter change
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // Serialize filters to a stable string for the dep array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), fetchData]);

  // Manual refetch with current filters
  const refetch = useCallback(() => {
    fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), fetchData]);

  return { data, isLoading, isError, error, refetch };
}

// ============================================================================
// Hook: useCollegeDetail (single college by ID)
// ============================================================================

interface UseCollegeDetailReturn {
  data: College | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

/**
 * Fetch a single college by ID from mock data.
 * In production, this would be a separate API call.
 */
export function useCollegeDetail(id: string | null): UseCollegeDetailReturn {
  const [data, setData] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    // Simulate network delay
    const timeout = setTimeout(() => {
      const college = mockColleges.find((c) => c.id === id || c.slug === id);
      if (college) {
        setData(college);
      } else {
        setIsError(true);
        setError(`College with ID "${id}" not found.`);
      }
      setIsLoading(false);
    }, Math.random() * 300 + 200);

    return () => clearTimeout(timeout);
  }, [id]);

  return { data, isLoading, isError, error };
}
