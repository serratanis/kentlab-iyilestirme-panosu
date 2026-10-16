export const CATEGORIES = ['Ulaşım', 'Çevre', 'Sosyal Yaşam', 'Erişilebilirlik', 'Kültür'] as const
export const PRIORITIES = ['Yüksek', 'Orta', 'Düşük'] as const
export const STATUSES = ['Yeni', 'Değerlendiriliyor', 'Planlandı', 'Tamamlandı'] as const

export type Category = (typeof CATEGORIES)[number]
export type Priority = (typeof PRIORITIES)[number]
export type IdeaStatus = (typeof STATUSES)[number]

export interface Idea {
  id: string
  title: string
  description: string
  category: Category
  neighborhood: string
  priority: Priority
  status: IdeaStatus
  impact: number
  createdAt: string
}

export type IdeaDraft = Omit<Idea, 'id' | 'createdAt'>

export interface Filters {
  query: string
  category: 'Tümü' | Category
  status: 'Tümü' | IdeaStatus
}
