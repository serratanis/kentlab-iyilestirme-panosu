import { useEffect, useId, useState } from 'react'
import { CATEGORIES, PRIORITIES, STATUSES, type Idea, type IdeaDraft } from '../interfaces/Idea'
import { Icon } from './Icon'

const emptyDraft: IdeaDraft = {
  title: '',
  description: '',
  category: 'Ulaşım',
  neighborhood: '',
  priority: 'Orta',
  status: 'Yeni',
  impact: 70,
}

interface IdeaFormModalProps {
  idea: Idea | null
  onClose: () => void
  onSave: (draft: IdeaDraft) => void
}

export function IdeaFormModal({ idea, onClose, onSave }: IdeaFormModalProps) {
  const titleId = useId()
  const [draft, setDraft] = useState<IdeaDraft>(idea ? {
    title: idea.title,
    description: idea.description,
    category: idea.category,
    neighborhood: idea.neighborhood,
    priority: idea.priority,
    status: idea.status,
    impact: idea.impact,
  } : emptyDraft)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (draft.title.trim().length < 4) nextErrors.title = 'Başlık en az 4 karakter olmalı.'
    if (draft.description.trim().length < 15) nextErrors.description = 'Açıklama en az 15 karakter olmalı.'
    if (draft.neighborhood.trim().length < 2) nextErrors.neighborhood = 'Mahalle veya bölge bilgisini yazın.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onSave({ ...draft, title: draft.title.trim(), description: draft.description.trim(), neighborhood: draft.neighborhood.trim() })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="modal-header">
          <div><span className="eyebrow">{idea ? 'Fikri güncelle' : 'Yeni kayıt'}</span><h2 id={titleId}>{idea ? 'Fikir detaylarını düzenle' : 'Kente değer katacak fikrini ekle'}</h2></div>
          <button className="icon-button" aria-label="Pencereyi kapat" onClick={onClose}><Icon name="close" /></button>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="form-grid">
            <label className="field field-wide">Fikir başlığı
              <input autoFocus value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Örn. Güvenli okul rotası" aria-invalid={Boolean(errors.title)} />
              {errors.title && <small className="error">{errors.title}</small>}
            </label>
            <label className="field">Kategori
              <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as IdeaDraft['category'] })}>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="field">Mahalle / Bölge
              <input value={draft.neighborhood} onChange={(event) => setDraft({ ...draft, neighborhood: event.target.value })} placeholder="Çınar Mahallesi" aria-invalid={Boolean(errors.neighborhood)} />
              {errors.neighborhood && <small className="error">{errors.neighborhood}</small>}
            </label>
            <label className="field">Öncelik
              <select value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value as IdeaDraft['priority'] })}>{PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="field">Durum
              <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as IdeaDraft['status'] })}>{STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="field field-wide">Açıklama
              <textarea rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Fikrin çözdüğü sorunu ve önerilen yaklaşımı açıklayın..." aria-invalid={Boolean(errors.description)} />
              <span className="field-meta">{draft.description.length} karakter</span>
              {errors.description && <small className="error">{errors.description}</small>}
            </label>
            <label className="field field-wide range-field">Beklenen etki puanı
              <div><input type="range" min="10" max="100" step="1" value={draft.impact} onChange={(event) => setDraft({ ...draft, impact: Number(event.target.value) })} /><output>{draft.impact}/100</output></div>
            </label>
          </div>
          <div className="modal-footer">
            <button type="button" className="button button-secondary" onClick={onClose}>Vazgeç</button>
            <button type="submit" className="button button-primary"><Icon name="check" size={18} /> {idea ? 'Değişiklikleri kaydet' : 'Fikri ekle'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
