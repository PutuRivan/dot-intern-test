import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
