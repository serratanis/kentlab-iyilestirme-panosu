import { useEffect, useMemo, useState } from 'react'
import { DeleteModal } from '../components/DeleteModal'
import { FilterBar } from '../components/FilterBar'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { IdeaCard } from '../components/IdeaCard'
import { IdeaFormModal } from '../components/IdeaFormModal'
import { Metrics } from '../components/Metrics'
import { seedIdeas } from '../data/seedIdeas'
import type { Filters, Idea, IdeaDraft } from '../interfaces/Idea'
import { calculateMetrics, filterIdeas } from '../utils/ideas'
import { readStoredIdeas, writeStoredIdeas } from '../utils/storage'

const initialFilters: Filters = { query: '', category: 'Tümü', status: 'Tümü' }

export function DashboardPage() {
  const [ideas, setIdeas] = useState<Idea[]>(() => readStoredIdeas(seedIdeas))
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [formOpen, setFormOpen] = useState(false)
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null)
  const [deletingIdea, setDeletingIdea] = useState<Idea | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => writeStoredIdeas(ideas), [ideas])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const visibleIdeas = useMemo(() => filterIdeas(ideas, filters), [ideas, filters])
  const metrics = useMemo(() => calculateMetrics(ideas), [ideas])

  function openNewIdea() {
    setEditingIdea(null)
    setFormOpen(true)
  }

  function saveIdea(draft: IdeaDraft) {
    if (editingIdea) {
      setIdeas((current) => current.map((idea) => idea.id === editingIdea.id ? { ...idea, ...draft } : idea))
      setNotice('Fikir başarıyla güncellendi.')
    } else {
      const newIdea: Idea = { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      setIdeas((current) => [newIdea, ...current])
      setNotice('Yeni fikir panoya eklendi.')
    }
    setFormOpen(false)
    setEditingIdea(null)
  }

  function confirmDelete() {
    if (!deletingIdea) return
    setIdeas((current) => current.filter((idea) => idea.id !== deletingIdea.id))
    setDeletingIdea(null)
    setNotice('Fikir panodan kaldırıldı.')
  }

  return (
    <div id="top">
      <Header onAdd={openNewIdea} />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Kent fikir laboratuvarı · 2026</span>
            <h1>Daha iyi bir mahalle,<br /><em>paylaşılan bir fikirle</em> başlar.</h1>
            <p>Yerel ihtiyaçları görünür kıl, fikirleri önceliklendir ve değişimin yolculuğunu tek bir panodan takip et.</p>
            <button className="button button-primary button-large" onClick={openNewIdea}>Fikrini paylaş <Icon name="arrow" size={19} /></button>
          </div>
          <aside className="hero-note">
            <span>Bu ayın odağı</span>
            <strong>Güvenli ve erişilebilir sokaklar</strong>
            <p>Yüksek öncelikli {metrics.highPriority} fikir, değerlendirme için hazır.</p>
            <div className="focus-orbit"><span>{metrics.averageImpact}</span><small>ortalama<br />etki puanı</small></div>
          </aside>
        </section>

        <Metrics metrics={metrics} />

        <section className="ideas-section" id="fikirler">
          <div className="section-heading">
            <div><span className="eyebrow">Açık fikir panosu</span><h2>Mahalleden yükselen fikirler</h2></div>
            <p>Arayın, filtreleyin ve her fikrin ilerleme durumunu izleyin.</p>
          </div>
          <FilterBar filters={filters} resultCount={visibleIdeas.length} totalCount={ideas.length} onChange={setFilters} />
          {visibleIdeas.length ? (
            <div className="idea-grid">
              {visibleIdeas.map((idea) => <IdeaCard key={idea.id} idea={idea} onEdit={(item) => { setEditingIdea(item); setFormOpen(true) }} onDelete={setDeletingIdea} />)}
            </div>
          ) : (
            <div className="empty-state"><span><Icon name="search" size={30} /></span><h3>Eşleşen fikir bulunamadı</h3><p>Arama kelimesini veya filtreleri değiştirerek yeniden deneyin.</p><button className="text-button" onClick={() => setFilters(initialFilters)}>Tüm fikirleri göster</button></div>
          )}
        </section>
      </main>
      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Icon name="leaf" size={20} /></span><span><strong>Kent</strong>Lab</span></div><p>Fikirleri görünür, değişimi ölçülebilir kılar.</p><span>Web Geliştirme · Yapay Zeka Eğitimi Projesi</span></footer>
      {formOpen && <IdeaFormModal idea={editingIdea} onClose={() => { setFormOpen(false); setEditingIdea(null) }} onSave={saveIdea} />}
      {deletingIdea && <DeleteModal idea={deletingIdea} onClose={() => setDeletingIdea(null)} onConfirm={confirmDelete} />}
      {notice && <div className="toast" role="status"><Icon name="check" size={18} />{notice}</div>}
    </div>
  )
}
