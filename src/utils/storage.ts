import type { Idea } from '../interfaces/Idea'

export const STORAGE_KEY = 'kentlab-ideas-v1'

export function readStoredIdeas(fallback: Idea[]): Idea[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (!value) return fallback
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? (parsed as Idea[]) : fallback
  } catch {
    return fallback
  }
}

export function writeStoredIdeas(ideas: Idea[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
}
