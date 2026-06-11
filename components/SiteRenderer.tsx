// Artisan Atelier — the public landing page rendered from LandingContent.
// Pure server component, CSS-only motion. Accent is per-site (--accent var).
import type { LandingContent } from '@/lib/content'

export interface Testimonial {
  id: string
  author_name: string
  author_location?: string | null
  quote: string
  rating?: number | null
  avatar_url?: string | null
}

export function SiteRenderer({
  content,
  testimonials = [],
}: {
  content: LandingContent
  testimonials?: Testimonial[]
}) {
  const a = content.theme?.accent || '#A47551'
  const { business: b, hero, promo, services, about, gallery, process, contact } = content
  const stripWords = services.items.slice(0, 4).map((s) => s.title)

  return (
    <div className="grain" style={{ ['--accent']: a } as React.CSSProperties}>
      {/* promo */}
      {promo?.active && promo.text && (
        <div style={{ background: 'var(--accent)' }} className="px-4 py-2 text-center text-sm font-medium text-white">
          {promo.text}
          {promo.code && <span className="ml-2 rounded bg-white/20 px-2 py-0.5 font-semibold">{promo.code}</span>}
        </div>
      )}

      {/* header */}
      <header className="hd">
        <div className="wrap hd-in">
          <div className="brand">{b.name}</div>
          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="pill">{hero.ctaLabel || 'Get a Quote'}</a>
        </div>
      </header>

      {/* hero */}
      <div className="wrap">
        <section className="hero">
          <div>
            <div className="label rise" style={{ animationDelay: '.05s' }}>
              <span className="tick" />{b.serviceArea || b.tagline}
            </div>
            <h1 className="rise" style={{ animationDelay: '.12s' }}>{hero.heading}</h1>
            <p className="lead rise" style={{ animationDelay: '.2s' }}>{hero.subheading}</p>
            <div className="cta-row rise" style={{ animationDelay: '.28s' }}>
              <a href="#contact" className="btn">{hero.ctaLabel || 'Get a Free Quote'}</a>
              {b.phone && <a href={`tel:${b.phone}`} className="btn-ghost">📞 {b.phone}</a>}
            </div>
          </div>
          <div className="arch rise" style={{ animationDelay: '.18s' }}>
            {hero.image && <img src={hero.image} alt={b.name} />}
          </div>
        </section>
      </div>

      {/* strip */}
      {stripWords.length > 0 && (
        <div className="strip">
          {stripWords.map((w, i) => (
            <span key={i} className="contents">
              <span>{w}</span>{i < stripWords.length - 1 && <span className="dot">·</span>}
            </span>
          ))}
        </div>
      )}

      {/* services */}
      <div className="wrap">
        <section className="blk" id="services">
          <div className="secnum reveal"><b>01</b><div className="sectitle">{services.heading}</div></div>
          <div className="reveal">
            {services.items.map((s, i) => (
              <div className="srv" key={i}>
                <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                <div className="nm">{s.title}</div>
                <div className="ds">{s.description}</div>
                <div className="ar">→</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* about */}
      {(about.heading || about.body) && (
        <div className="wrap">
          <section className="blk about">
            <div className="arch2 reveal">{about.image && <img src={about.image} alt={about.heading} />}</div>
            <div className="reveal">
              <div className="label" style={{ marginBottom: 18 }}><span className="tick" />{about.heading}</div>
              <p className="pull">{about.body}</p>
            </div>
          </section>
        </div>
      )}

      {/* gallery */}
      {gallery.images.length > 0 && (
        <div className="wrap">
          <section className="blk" id="work">
            <div className="secnum reveal"><b>02</b><div className="sectitle">{gallery.heading}</div></div>
            <div className="gal reveal">
              {gallery.images.map((img, i) => (
                <div className="g" key={i}><img src={img.url} alt={img.alt || gallery.heading} /></div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* process */}
      {process.steps.length > 0 && (
        <div className="wrap">
          <section className="blk" id="process">
            <div className="secnum reveal"><b>03</b><div className="sectitle">{process.heading}</div></div>
            <div className="proc reveal">
              {process.steps.map((s, i) => (
                <div key={i}><div className="n">{i + 1}</div><h4>{s.title}</h4><p>{s.description}</p></div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* testimonials */}
      {testimonials.length > 0 && (
        <div className="wrap">
          <section className="blk">
            <div className="secnum reveal"><b>04</b><div className="sectitle">What clients say</div></div>
            <div className="tg reveal">
              {testimonials.map((t) => (
                <div className="tcard" key={t.id}>
                  <div className="stars">{'★'.repeat(t.rating ?? 5)}</div>
                  <p className="q">&ldquo;{t.quote}&rdquo;</p>
                  <div className="who">{t.author_name}{t.author_location ? ` — ${t.author_location}` : ''}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* contact */}
      <div className="wrap">
        <section className="contact" id="contact">
          <div className="label" style={{ justifyContent: 'center', marginBottom: 18 }}><span className="tick" />Get in touch</div>
          <h2>{contact.heading}</h2>
          <div className="cta-row" style={{ justifyContent: 'center', marginTop: 32 }}>
            {b.phone && <a href={`tel:${b.phone}`} className="btn">📞 Call {b.phone}</a>}
            {b.facebook && <a href={b.facebook} className="btn-ghost">Message on Facebook</a>}
          </div>
          <div className="meta">
            {b.serviceArea && <>Serving {b.serviceArea}</>}{b.hours && <> · {b.hours}</>}
          </div>
        </section>
      </div>

      <div className="wrap">
        <footer className="ft">
          <div className="brand" style={{ fontSize: '1.1rem' }}>{b.name}</div>
          <div>© {new Date().getFullYear()} {b.name}. {b.serviceArea && `Serving ${b.serviceArea}.`}</div>
        </footer>
      </div>
    </div>
  )
}
