import type { ReturnTypeOfMetrics } from '../types'

export function Metrics({ metrics }: { metrics: ReturnTypeOfMetrics }) {
  const cards = [
    { label: 'Toplam fikir', value: metrics.total, note: 'Aktif kayıt', tone: 'forest' },
    { label: 'Süreçte', value: metrics.inProgress, note: 'İnceleniyor veya planlı', tone: 'amber' },
    { label: 'Tamamlanan', value: metrics.completed, note: `%${metrics.completionRate} tamamlama`, tone: 'sage' },
    { label: 'Ortalama etki', value: metrics.averageImpact, note: '100 üzerinden', tone: 'ink' },
  ]

  return (
    <section className="metric-grid" aria-label="Proje özeti" id="etki">
      {cards.map((card) => (
        <article className={`metric-card ${card.tone}`} key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.note}</small>
        </article>
      ))}
    </section>
  )
}
