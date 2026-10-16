import type { Idea } from '../interfaces/Idea'
import { formatDate } from '../utils/ideas'
import { Icon } from './Icon'

interface IdeaCardProps {
  idea: Idea
  onEdit: (idea: Idea) => void
  onDelete: (idea: Idea) => void
}

export function IdeaCard({ idea, onEdit, onDelete }: IdeaCardProps) {
  const statusClass = idea.status.toLocaleLowerCase('tr-TR').replaceAll(' ', '-').replaceAll('ı', 'i')
  const priorityClass = idea.priority.toLocaleLowerCase('tr-TR').replaceAll('ü', 'u')

  return (
    <article className="idea-card">
      <div className="idea-card-top">
        <span className={`status-pill ${statusClass}`}><span />{idea.status}</span>
        <div className="card-actions">
          <button aria-label={`${idea.title} fikrini düzenle`} title="Düzenle" onClick={() => onEdit(idea)}><Icon name="edit" size={17} /></button>
          <button aria-label={`${idea.title} fikrini sil`} title="Sil" onClick={() => onDelete(idea)}><Icon name="trash" size={17} /></button>
        </div>
      </div>
      <div className="category-label">{idea.category}</div>
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <div className="impact-row">
        <span>Beklenen etki</span>
        <strong>{idea.impact}/100</strong>
        <div className="impact-track" aria-label={`Etki puanı ${idea.impact}`}><span style={{ width: `${idea.impact}%` }} /></div>
      </div>
      <footer>
        <span className={`priority ${priorityClass}`}>{idea.priority} öncelik</span>
        <span>{idea.neighborhood}</span>
        <time dateTime={idea.createdAt}>{formatDate(idea.createdAt)}</time>
      </footer>
    </article>
  )
}
