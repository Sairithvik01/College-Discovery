import type { College } from "@/types/college";

/**
 * 12 realistic Indian colleges spanning government, private, deemed, and autonomous types
 * across multiple states, courses, fee ranges, and placement tiers.
 *
 * Image URLs use placeholder services — swap with real assets in production.
 */
export const mockColleges: College[] = [
  {
    id: "col-001",
    name: "Indian Institute of Technology, Bombay",
    slug: "iit-bombay",
    description:
      "One of India's premier engineering institutions, consistently ranked among the top 200 universities globally. Known for cutting-edge research and exceptional placements.",
    type: "government",
    establishedYear: 1958,
    affiliations: ["UGC", "AICTE", "NAAC", "NIRF", "IIT"],
    location: { city: "Mumbai", state: "Maharashtra", latitude: 19.1334, longitude: 72.9133 },
    rating: 4.8,
    nirfRanking: 3,
    reviewCount: 2450,
    imageUrl: "/images/colleges/iit-bombay.jpg",
    logoUrl: "/images/logos/iit-bombay.png",
    courses: [
      { id: "crs-001", name: "B.Tech Computer Science", duration: 4, annualFees: 225000, level: "undergraduate" },
      { id: "crs-002", name: "B.Tech Electrical Engineering", duration: 4, annualFees: 225000, level: "undergraduate" },
      { id: "crs-003", name: "M.Tech AI & Data Science", duration: 2, annualFees: 115000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 95,
      highestPackage: 280,
      averagePackage: 28.5,
      medianPackage: 21.0,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Uber", "Apple"],
    },
    feesRange: { min: 115000, max: 225000 },
    isFeatured: true,
    tags: ["Top 10", "Best ROI", "Research Excellence"],
  },
  {
    id: "col-002",
    name: "Indian Institute of Technology, Delhi",
    slug: "iit-delhi",
    description:
      "A flagship IIT located in the heart of New Delhi, renowned for world-class faculty, robust industry partnerships, and a thriving entrepreneurship ecosystem.",
    type: "government",
    establishedYear: 1961,
    affiliations: ["UGC", "AICTE", "NAAC", "NIRF", "IIT"],
    location: { city: "New Delhi", state: "Delhi", latitude: 28.5459, longitude: 77.1926 },
    rating: 4.8,
    nirfRanking: 2,
    reviewCount: 2100,
    imageUrl: "/images/colleges/iit-delhi.jpg",
    logoUrl: "/images/logos/iit-delhi.png",
    courses: [
      { id: "crs-004", name: "B.Tech Computer Science", duration: 4, annualFees: 224000, level: "undergraduate" },
      { id: "crs-005", name: "B.Tech Mechanical Engineering", duration: 4, annualFees: 224000, level: "undergraduate" },
      { id: "crs-006", name: "M.Tech Machine Learning", duration: 2, annualFees: 112000, level: "postgraduate" },
      { id: "crs-007", name: "MBA", duration: 2, annualFees: 975000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 96,
      highestPackage: 310,
      averagePackage: 30.2,
      medianPackage: 23.5,
      topRecruiters: ["Amazon", "Google", "McKinsey", "Adobe", "Qualcomm"],
    },
    feesRange: { min: 112000, max: 975000 },
    isFeatured: true,
    tags: ["Top 5", "Startup Hub", "Research Excellence"],
  },
  {
    id: "col-003",
    name: "Birla Institute of Technology & Science, Pilani",
    slug: "bits-pilani",
    description:
      "A prestigious deemed university known for its flexible curriculum, PS-1/PS-2 internship system, and strong alumni network in the tech industry.",
    type: "deemed",
    establishedYear: 1964,
    affiliations: ["UGC", "NAAC", "NIRF"],
    location: { city: "Pilani", state: "Rajasthan", latitude: 28.3643, longitude: 75.5870 },
    rating: 4.5,
    nirfRanking: 24,
    reviewCount: 1850,
    imageUrl: "/images/colleges/bits-pilani.jpg",
    logoUrl: "/images/logos/bits-pilani.png",
    courses: [
      { id: "crs-008", name: "B.E. Computer Science", duration: 4, annualFees: 495000, level: "undergraduate" },
      { id: "crs-009", name: "B.E. Electronics & Instrumentation", duration: 4, annualFees: 495000, level: "undergraduate" },
      { id: "crs-010", name: "M.E. Software Systems", duration: 2, annualFees: 510000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 88,
      highestPackage: 150,
      averagePackage: 22.3,
      medianPackage: 17.0,
      topRecruiters: ["Samsung", "DE Shaw", "Google", "Sprinklr", "Microsoft"],
    },
    feesRange: { min: 495000, max: 510000 },
    isFeatured: true,
    tags: ["Best Campus Life", "Industry Connect"],
  },
  {
    id: "col-004",
    name: "National Institute of Technology, Trichy",
    slug: "nit-trichy",
    description:
      "The top-ranked NIT in India, located in Tamil Nadu. Offers affordable, high-quality engineering education with excellent placement outcomes across core and IT sectors.",
    type: "government",
    establishedYear: 1964,
    affiliations: ["UGC", "AICTE", "NAAC", "NIRF", "NIT"],
    location: { city: "Tiruchirappalli", state: "Tamil Nadu", latitude: 10.7596, longitude: 78.8145 },
    rating: 4.4,
    nirfRanking: 9,
    reviewCount: 1320,
    imageUrl: "/images/colleges/nit-trichy.jpg",
    logoUrl: "/images/logos/nit-trichy.png",
    courses: [
      { id: "crs-011", name: "B.Tech Computer Science", duration: 4, annualFees: 175000, level: "undergraduate" },
      { id: "crs-012", name: "B.Tech Civil Engineering", duration: 4, annualFees: 175000, level: "undergraduate" },
      { id: "crs-013", name: "M.Tech Structural Engineering", duration: 2, annualFees: 88000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 90,
      highestPackage: 78,
      averagePackage: 14.5,
      medianPackage: 10.8,
      topRecruiters: ["TCS", "Infosys", "L&T", "Oracle", "Caterpillar"],
    },
    feesRange: { min: 88000, max: 175000 },
    isFeatured: false,
    tags: ["Top NIT", "Affordable", "Core Engineering"],
  },
  {
    id: "col-005",
    name: "Manipal Institute of Technology",
    slug: "manipal-mit",
    description:
      "A leading private engineering college under Manipal Academy of Higher Education. Known for its cosmopolitan campus, strong international collaborations, and diverse student body.",
    type: "private",
    establishedYear: 1957,
    affiliations: ["UGC", "NAAC", "NIRF"],
    location: { city: "Manipal", state: "Karnataka", latitude: 13.3525, longitude: 74.7928 },
    rating: 4.2,
    nirfRanking: 45,
    reviewCount: 1670,
    imageUrl: "/images/colleges/manipal-mit.jpg",
    logoUrl: "/images/logos/manipal-mit.png",
    courses: [
      { id: "crs-014", name: "B.Tech Computer Science", duration: 4, annualFees: 670000, level: "undergraduate" },
      { id: "crs-015", name: "B.Tech Biotechnology", duration: 4, annualFees: 590000, level: "undergraduate" },
      { id: "crs-016", name: "B.Tech Data Science & Engineering", duration: 4, annualFees: 670000, level: "undergraduate" },
    ],
    placements: {
      placementRate: 82,
      highestPackage: 68,
      averagePackage: 12.0,
      medianPackage: 8.5,
      topRecruiters: ["Cisco", "VMware", "Goldman Sachs", "Honeywell", "TCS"],
    },
    feesRange: { min: 590000, max: 670000 },
    isFeatured: false,
    tags: ["Best Campus", "International Exposure"],
  },
  {
    id: "col-006",
    name: "Vellore Institute of Technology",
    slug: "vit-vellore",
    description:
      "One of India's largest private universities with a strong emphasis on research output, coding culture, and a massive placement drive that attracts 500+ companies annually.",
    type: "private",
    establishedYear: 1984,
    affiliations: ["UGC", "NAAC", "NIRF"],
    location: { city: "Vellore", state: "Tamil Nadu", latitude: 12.9692, longitude: 79.1559 },
    rating: 4.0,
    nirfRanking: 12,
    reviewCount: 3200,
    imageUrl: "/images/colleges/vit-vellore.jpg",
    logoUrl: "/images/logos/vit-vellore.png",
    courses: [
      { id: "crs-017", name: "B.Tech Computer Science", duration: 4, annualFees: 520000, level: "undergraduate" },
      { id: "crs-018", name: "B.Tech Electronics & Communication", duration: 4, annualFees: 425000, level: "undergraduate" },
      { id: "crs-019", name: "M.Tech Cyber Security", duration: 2, annualFees: 260000, level: "postgraduate" },
      { id: "crs-020", name: "Ph.D. Computer Science", duration: 4, annualFees: 120000, level: "doctoral" },
    ],
    placements: {
      placementRate: 85,
      highestPackage: 82,
      averagePackage: 10.8,
      medianPackage: 7.5,
      topRecruiters: ["Amazon", "Deloitte", "Wipro", "Cognizant", "Zoho"],
    },
    feesRange: { min: 120000, max: 520000 },
    isFeatured: true,
    tags: ["Highest Intake", "Research Output"],
  },
  {
    id: "col-007",
    name: "Delhi Technological University",
    slug: "dtu-delhi",
    description:
      "Formerly Delhi College of Engineering, DTU is a state government university that combines legacy reputation with modern infrastructure and strong placement records.",
    type: "government",
    establishedYear: 1941,
    affiliations: ["UGC", "AICTE", "NAAC", "NIRF"],
    location: { city: "New Delhi", state: "Delhi", latitude: 28.7499, longitude: 77.1180 },
    rating: 4.3,
    nirfRanking: 36,
    reviewCount: 1480,
    imageUrl: "/images/colleges/dtu-delhi.jpg",
    logoUrl: "/images/logos/dtu-delhi.png",
    courses: [
      { id: "crs-021", name: "B.Tech Software Engineering", duration: 4, annualFees: 185000, level: "undergraduate" },
      { id: "crs-022", name: "B.Tech Information Technology", duration: 4, annualFees: 185000, level: "undergraduate" },
      { id: "crs-023", name: "MBA", duration: 2, annualFees: 350000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 91,
      highestPackage: 120,
      averagePackage: 16.5,
      medianPackage: 12.0,
      topRecruiters: ["Microsoft", "Samsung", "Adobe", "HCL", "Paytm"],
    },
    feesRange: { min: 185000, max: 350000 },
    isFeatured: false,
    tags: ["Legacy Institution", "Affordable"],
  },
  {
    id: "col-008",
    name: "SRM Institute of Science & Technology",
    slug: "srm-chennai",
    description:
      "A top-tier private university near Chennai offering 200+ programs. Known for its sprawling campus, strong international tie-ups, and the SRM Joint Engineering Entrance Exam.",
    type: "deemed",
    establishedYear: 1985,
    affiliations: ["UGC", "NAAC", "NIRF"],
    location: { city: "Chennai", state: "Tamil Nadu", latitude: 12.8231, longitude: 80.0441 },
    rating: 3.9,
    nirfRanking: 33,
    reviewCount: 2800,
    imageUrl: "/images/colleges/srm-chennai.jpg",
    logoUrl: "/images/logos/srm-chennai.png",
    courses: [
      { id: "crs-024", name: "B.Tech Computer Science", duration: 4, annualFees: 550000, level: "undergraduate" },
      { id: "crs-025", name: "B.Tech AI & Machine Learning", duration: 4, annualFees: 580000, level: "undergraduate" },
      { id: "crs-026", name: "Diploma in Data Analytics", duration: 1, annualFees: 200000, level: "diploma" },
    ],
    placements: {
      placementRate: 80,
      highestPackage: 54,
      averagePackage: 8.5,
      medianPackage: 6.0,
      topRecruiters: ["Infosys", "TCS", "Capgemini", "Zoho", "HCL"],
    },
    feesRange: { min: 200000, max: 580000 },
    isFeatured: false,
    tags: ["Large Campus", "International Tie-ups"],
  },
  {
    id: "col-009",
    name: "International Institute of Information Technology, Hyderabad",
    slug: "iiit-hyderabad",
    description:
      "A research-driven autonomous university specializing in IT, AI, and computational linguistics. Known for its CIE (Centre for Innovation & Entrepreneurship) and research-first approach.",
    type: "autonomous",
    establishedYear: 1998,
    affiliations: ["UGC", "AICTE", "NAAC", "NIRF"],
    location: { city: "Hyderabad", state: "Telangana", latitude: 17.4454, longitude: 78.3489 },
    rating: 4.6,
    nirfRanking: 18,
    reviewCount: 950,
    imageUrl: "/images/colleges/iiit-hyderabad.jpg",
    logoUrl: "/images/logos/iiit-hyderabad.png",
    courses: [
      { id: "crs-027", name: "B.Tech Computer Science", duration: 4, annualFees: 380000, level: "undergraduate" },
      { id: "crs-028", name: "B.Tech Electronics & Communication", duration: 4, annualFees: 380000, level: "undergraduate" },
      { id: "crs-029", name: "M.Tech Computational Linguistics", duration: 2, annualFees: 200000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 97,
      highestPackage: 190,
      averagePackage: 32.0,
      medianPackage: 26.0,
      topRecruiters: ["Google", "Facebook", "Apple", "Tower Research", "Uber"],
    },
    feesRange: { min: 200000, max: 380000 },
    isFeatured: true,
    tags: ["Research First", "AI Hub", "Best Placements"],
  },
  {
    id: "col-010",
    name: "PSG College of Technology",
    slug: "psg-tech",
    description:
      "An autonomous, self-financing engineering college in Coimbatore with 70+ years of legacy. Known for its disciplined academic culture and strong industry connections in manufacturing and IT.",
    type: "autonomous",
    establishedYear: 1951,
    affiliations: ["UGC", "AICTE", "NAAC", "NBA"],
    location: { city: "Coimbatore", state: "Tamil Nadu", latitude: 11.0243, longitude: 77.0026 },
    rating: 4.1,
    nirfRanking: 58,
    reviewCount: 890,
    imageUrl: "/images/colleges/psg-tech.jpg",
    logoUrl: "/images/logos/psg-tech.png",
    courses: [
      { id: "crs-030", name: "B.E. Computer Science", duration: 4, annualFees: 165000, level: "undergraduate" },
      { id: "crs-031", name: "B.E. Mechanical Engineering", duration: 4, annualFees: 145000, level: "undergraduate" },
      { id: "crs-032", name: "M.E. Embedded Systems", duration: 2, annualFees: 95000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 86,
      highestPackage: 44,
      averagePackage: 8.2,
      medianPackage: 6.5,
      topRecruiters: ["Bosch", "Zoho", "Ford", "TCS", "Cognizant"],
    },
    feesRange: { min: 95000, max: 165000 },
    isFeatured: false,
    tags: ["Legacy Institution", "Affordable", "Core Engineering"],
  },
  {
    id: "col-011",
    name: "Indian Institute of Management, Ahmedabad",
    slug: "iim-ahmedabad",
    description:
      "India's most prestigious business school, consistently ranked #1 for MBA programs. Known for its case-study pedagogy, entrepreneurial alumni, and unmatched placement records in consulting and finance.",
    type: "autonomous",
    establishedYear: 1961,
    affiliations: ["UGC", "NAAC", "NIRF", "IIM"],
    location: { city: "Ahmedabad", state: "Gujarat", latitude: 23.0339, longitude: 72.5290 },
    rating: 4.9,
    nirfRanking: 1,
    reviewCount: 1750,
    imageUrl: "/images/colleges/iim-ahmedabad.jpg",
    logoUrl: "/images/logos/iim-ahmedabad.png",
    courses: [
      { id: "crs-033", name: "PGP in Management (MBA)", duration: 2, annualFees: 1200000, level: "postgraduate" },
      { id: "crs-034", name: "Executive MBA", duration: 1, annualFees: 2800000, level: "postgraduate" },
      { id: "crs-035", name: "Ph.D. in Management", duration: 4, annualFees: 150000, level: "doctoral" },
    ],
    placements: {
      placementRate: 100,
      highestPackage: 120,
      averagePackage: 38.0,
      medianPackage: 34.0,
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan"],
    },
    feesRange: { min: 150000, max: 2800000 },
    isFeatured: true,
    tags: ["#1 MBA", "Consulting", "Finance"],
  },
  {
    id: "col-012",
    name: "College of Engineering, Pune",
    slug: "coep-pune",
    description:
      "One of the oldest engineering colleges in Asia, established in 1854. An autonomous institute under Savitribai Phule Pune University, known for its rigorous academic culture and affordable education.",
    type: "autonomous",
    establishedYear: 1854,
    affiliations: ["UGC", "AICTE", "NAAC", "NBA"],
    location: { city: "Pune", state: "Maharashtra", latitude: 18.5293, longitude: 73.8567 },
    rating: 4.2,
    nirfRanking: 42,
    reviewCount: 1100,
    imageUrl: "/images/colleges/coep-pune.jpg",
    logoUrl: "/images/logos/coep-pune.png",
    courses: [
      { id: "crs-036", name: "B.Tech Computer Engineering", duration: 4, annualFees: 140000, level: "undergraduate" },
      { id: "crs-037", name: "B.Tech Instrumentation & Control", duration: 4, annualFees: 130000, level: "undergraduate" },
      { id: "crs-038", name: "M.Tech VLSI & Embedded Systems", duration: 2, annualFees: 72000, level: "postgraduate" },
    ],
    placements: {
      placementRate: 87,
      highestPackage: 63,
      averagePackage: 12.5,
      medianPackage: 9.0,
      topRecruiters: ["Persistent Systems", "Siemens", "Bajaj Auto", "Nvidia", "Texas Instruments"],
    },
    feesRange: { min: 72000, max: 140000 },
    isFeatured: false,
    tags: ["Historic", "Affordable", "Pune IT Hub"],
  },
];

/**
 * Helper: Get unique states from mock data for filter dropdowns.
 */
export function getUniqueStates(): string[] {
  return [...new Set(mockColleges.map((c) => c.location.state))].sort();
}

/**
 * Helper: Get unique college types from mock data for filter checkboxes.
 */
export function getUniqueCollegeTypes(): string[] {
  return [...new Set(mockColleges.map((c) => c.type))].sort();
}

/**
 * Helper: Get fees range bounds across all colleges.
 */
export function getFeesRangeBounds(): { min: number; max: number } {
  const mins = mockColleges.map((c) => c.feesRange.min);
  const maxes = mockColleges.map((c) => c.feesRange.max);
  return {
    min: Math.min(...mins),
    max: Math.max(...maxes),
  };
}
