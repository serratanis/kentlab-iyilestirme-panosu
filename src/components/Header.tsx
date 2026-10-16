import { Icon } from './Icon'

export function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="KentLab ana sayfa">
        <span className="brand-mark"><Icon name="leaf" size={24} /></span>
        <span><strong>Kent</strong>Lab</span>
      </a>
      <nav aria-label="Ana menü">
        <a className="nav-link active" href="#fikirler">Fikirler</a>
        <a className="nav-link" href="#etki">Etki özeti</a>
      </nav>
      <button className="button button-primary header-action" onClick={onAdd}>
        <Icon name="plus" size={18} /> Yeni fikir
      </button>
    </header>
  )
}
