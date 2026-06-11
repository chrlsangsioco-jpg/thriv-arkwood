// Mirror of the ThrivBOT site content contract (the standard). Keep in sync.
export interface SiteImage { url: string; alt: string }

export interface LandingContent {
  business: {
    name: string; tagline: string; phone: string; email: string; facebook: string
    address: string; serviceArea: string; hours: string; logoUrl: string
  }
  theme: { accent: string }
  hero: { heading: string; subheading: string; ctaLabel: string; image: string }
  promo: { active: boolean; text: string; code: string; expires: string }
  services: { heading: string; items: { title: string; description: string; icon: string }[] }
  about: { heading: string; body: string; image: string }
  gallery: { heading: string; images: SiteImage[] }
  process: { heading: string; steps: { title: string; description: string }[] }
  contact: { heading: string; body: string }
  seo: { title: string; description: string; keywords: string }
}
