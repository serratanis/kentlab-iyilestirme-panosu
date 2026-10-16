import { describe, expect, it } from 'vitest'
import { seedIdeas } from '../data/seedIdeas'
import { calculateMetrics, filterIdeas } from './ideas'

describe('fikir panosu yardımcıları', () => {
  it('özet metrikleri doğru hesaplar', () => {
    expect(calculateMetrics(seedIdeas)).toEqual({
      total: 6,
      inProgress: 3,
      completed: 1,
      highPriority: 3,
      averageImpact: 83,
      completionRate: 17,
    })
  })

  it('Türkçe metin, kategori ve durumla filtreler', () => {
    const result = filterIdeas(seedIdeas, { query: 'okul', category: 'Ulaşım', status: 'Planlandı' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Güvenli okul rotası')
  })

  it('eşleşme yoksa boş liste döndürür', () => {
    expect(filterIdeas(seedIdeas, { query: 'bulunmayan', category: 'Tümü', status: 'Tümü' })).toEqual([])
  })
})
