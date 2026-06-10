import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as Indian Rupee currency.
 * e.g. 225000 → "₹2,25,000"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format LPA values for placement stats.
 * e.g. 28.5 → "₹28.5 LPA"
 */
export function formatLPA(amount: number): string {
  return `₹${amount} LPA`;
}
