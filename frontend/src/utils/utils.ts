import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function IsMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
