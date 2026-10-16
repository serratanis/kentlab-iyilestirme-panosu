import type { Filters, Idea } from '../interfaces/Idea'

export function filterIdeas(ideas: Idea[], filters: Filters): Idea[] {
  const normalizedQuery = filters.query.trim().toLocaleLowerCase('tr-TR')

  return ideas.filter((idea) => {
    const searchable = `${idea.title} ${idea.description} ${idea.neighborhood}`.toLocaleLowerCase('tr-TR')
    const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery)
    const matchesCategory = filters.category === 'Tümü' || idea.category === filters.category
    const matchesStatus = filters.status === 'Tümü' || idea.status === filters.status
    return matchesQuery && matchesCategory && matchesStatus
  })
}

export function calculateMetrics(ideas: Idea[]) {
  const completed = ideas.filter((idea) => idea.status === 'Tamamlandı').length
  const highPriority = ideas.filter((idea) => idea.priority === 'Yüksek').length
  const averageImpact = ideas.length
    ? Math.round(ideas.reduce((total, idea) => total + idea.impact, 0) / ideas.length)
    : 0

  return {
    total: ideas.length,
    inProgress: ideas.filter((idea) => ['Değerlendiriliyor', 'Planlandı'].includes(idea.status)).length,
    completed,
    highPriority,
    averageImpact,
    completionRate: ideas.length ? Math.round((completed / ideas.length) * 100) : 0,
  }
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate))
}
