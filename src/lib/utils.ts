import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstNameAndLastName(name: string) {
  const [firstName, ...rest] = name.split(" ")
  return { firstName, lastName: rest?.join(" ") ?? '' }
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const durationText = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  return { minutes, remainingSeconds, durationText }
}

export const getDisplayName = (name: string) => {
  return name.replace(/_community$/, "").replace(/#/g, "").replace(/_/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function getInitials(name?: string | string[]) {
  if (!name) return '';

  if (Array.isArray(name)) {
    return name
      .filter(Boolean)
      .map(word =>  word.charAt(0).toUpperCase())
      .join('');
  }

  return name
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}
