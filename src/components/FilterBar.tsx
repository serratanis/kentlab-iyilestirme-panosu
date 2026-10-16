import { CATEGORIES, STATUSES, type Filters } from '../interfaces/Idea'
import { Icon } from './Icon'

interface FilterBarProps {
  filters: Filters
  resultCount: number
  totalCount: number
  onChange: (filters: Filters) => void
}

export function FilterBar({ filters, resultCount, totalCount, onChange }: FilterBarProps) {
  const hasFilters = filters.query || filters.category !== 'Tümü' || filters.status !== 'Tümü'

  return (
    <div className="filter-panel">
      <label className="search-box">
        <span className="sr-only">Fikirlerde ara</span>
        <Icon name="search" size={19} />
        <input
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Başlık, açıklama veya mahallede ara..."
        />
      </label>
      <label className="select-wrap">
        <span className="sr-only">Kategori seç</span>
        <select value={filters.category} onChange={(event) => onChange({ ...filters, category: event.target.value as Filters['category'] })}>
          <option>Tümü</option>
          {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
        </select>
      </label>
      <label className="select-wrap">
        <span className="sr-only">Durum seç</span>
        <select value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as Filters['status'] })}>
          <option>Tümü</option>
          {STATUSES.map((status) => <option key={status}>{status}</option>)}
        </select>
      </label>
      <span className="result-count" aria-live="polite">{resultCount} / {totalCount} fikir</span>
      {hasFilters && (
        <button className="text-button" onClick={() => onChange({ query: '', category: 'Tümü', status: 'Tümü' })}>Temizle</button>
      )}
    </div>
  )
}
