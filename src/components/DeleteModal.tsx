import type { Idea } from '../interfaces/Idea'
import { Icon } from './Icon'

export function DeleteModal({ idea, onClose, onConfirm }: { idea: Idea; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal modal-small" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description">
        <div className="danger-icon"><Icon name="trash" size={24} /></div>
        <h2 id="delete-title">Bu fikir silinsin mi?</h2>
        <p id="delete-description"><strong>“{idea.title}”</strong> kalıcı olarak kaldırılacak. Bu işlem geri alınamaz.</p>
        <div className="modal-footer">
          <button className="button button-secondary" onClick={onClose}>Vazgeç</button>
          <button className="button button-danger" onClick={onConfirm}>Fikri sil</button>
        </div>
      </section>
    </div>
  )
}
