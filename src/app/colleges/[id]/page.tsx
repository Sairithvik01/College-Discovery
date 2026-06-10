import type { Metadata } from "next";
import { CollegeDetailPage } from "@/components/features/detail/college-detail-page";
import { mockColleges } from "@/lib/mockData";

/**
 * Pre-generate all college detail pages at build time.
 * Required for `output: 'export'` (GitHub Pages static deployment).
 */
export function generateStaticParams() {
  return mockColleges.map((college) => ({
    id: college.slug,
  }));
}

/**
 * Dynamic route: /colleges/[id]
 * The [id] param can be a college slug (e.g., "iit-bombay") or a college ID.
 *
 * The route file stays thin — all logic is in <CollegeDetailPage>.
 */

interface CollegePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CollegePageProps): Promise<Metadata> {
  const { id } = await params;
  // In production, fetch college data here for proper SEO
  const title = id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} — College Discovery`,
    description: `Explore courses, placements, fees, and more at ${title}. Find if this is the right college for you.`,
  };
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { id } = await params;
  return <CollegeDetailPage collegeId={id} />;
}
