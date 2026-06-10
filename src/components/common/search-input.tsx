"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  /** Current input value (controlled) */
  value: string;
  /** Called on every keystroke */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Optional className */
  className?: string;
}

/**
 * Reusable search input with icon and clear button.
 * The parent is responsible for debouncing — this component
 * is a controlled input that fires onChange immediately.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search colleges...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search colleges"
        className={cn(
          "h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900",
          "placeholder:text-gray-400 outline-none transition-colors",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
          "dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500",
          "dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
