// ============================================================================
// College Domain Types
// ============================================================================

/**
 * Placement statistics for a college.
 * All monetary values are in INR (lakhs per annum).
 */
export interface PlacementStats {
  /** Percentage of eligible students placed (0–100) */
  placementRate: number;
  /** Highest package offered in LPA */
  highestPackage: number;
  /** Average package offered in LPA */
  averagePackage: number;
  /** Median package offered in LPA */
  medianPackage: number;
  /** Notable recruiting companies */
  topRecruiters: string[];
}

/**
 * A course/program offered by a college.
 */
export interface Course {
  /** Unique identifier for the course */
  id: string;
  /** Course name, e.g. "B.Tech Computer Science" */
  name: string;
  /** Duration in years */
  duration: number;
  /** Annual fees in INR */
  annualFees: number;
  /** Degree level */
  level: "undergraduate" | "postgraduate" | "doctoral" | "diploma";
}

/**
 * Geographic location of the college.
 */
export interface CollegeLocation {
  city: string;
  state: string;
  /** Optional for map integration */
  latitude?: number;
  /** Optional for map integration */
  longitude?: number;
}

/** Ownership type of the college */
export type CollegeType = "government" | "private" | "deemed" | "autonomous";

/** Affiliation / accreditation body */
export type Affiliation =
  | "UGC"
  | "AICTE"
  | "NAAC"
  | "NBA"
  | "NIRF"
  | "IIM"
  | "IIT"
  | "NIT";

/**
 * Core College entity — the primary domain model.
 */
export interface College {
  /** Unique identifier */
  id: string;
  /** Full name of the college */
  name: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Short description (1–2 sentences) */
  description: string;
  /** College type */
  type: CollegeType;
  /** Establishment year */
  establishedYear: number;
  /** Affiliations and accreditations */
  affiliations: Affiliation[];
  /** Geographic location */
  location: CollegeLocation;
  /** Overall rating out of 5 */
  rating: number;
  /** NIRF ranking (if applicable) */
  nirfRanking?: number;
  /** Total number of student reviews */
  reviewCount: number;
  /** Hero/banner image URL */
  imageUrl: string;
  /** College logo URL */
  logoUrl?: string;
  /** List of courses offered */
  courses: Course[];
  /** Placement statistics */
  placements: PlacementStats;
  /** Annual fees range — min across all courses */
  feesRange: {
    min: number;
    max: number;
  };
  /** Whether the college is featured/promoted */
  isFeatured: boolean;
  /** Tags for quick filtering (e.g., "Top 100", "Best ROI") */
  tags: string[];
}

// ============================================================================
// API Response Wrappers
// ============================================================================

/**
 * Paginated list response from the API.
 */
export interface CollegeListResponse {
  colleges: College[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  };
}

/**
 * Single college detail response.
 */
export interface CollegeDetailResponse {
  college: College;
  /** Related/similar colleges */
  relatedColleges: College[];
}
