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

export function formatRelativeDate(dateString: string): string {
  const inputDate = new Date(dateString);
  const today = new Date();
  
  // Reset time to compare only dates
  const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = inputDateOnly.getTime() - todayOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else if (diffDays === -1) {
    return "Yesterday";
  } else {
    // Return formatted date for other dates
    return inputDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
