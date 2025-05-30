import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function extractIdFromSlug(slug?: string): string {
  const match = slug ? slug.match(/-(\d+)$/) : ""; // Match last -digits at end
  return match ? match[1]: '';
}
