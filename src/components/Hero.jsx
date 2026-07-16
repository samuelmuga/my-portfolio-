import { CONFIG } from '../config.js'

export default function Hero() {
  const { name, roles, tagline, github } = CONFIG.profile
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__content">
        <p className="hero__eyebrow">Welcome to my portfolio</p>
        <h1 className="hero__title">
          Hello, I'm <span className="gradient-text">{name}</span>
        </h1>
        <p className="hero__roles">
          {roles.map((r, i) => (
            <span key={r} className="hero__role">
              {r}
              {i < roles.length - 1 && <span className="hero__sep">/</span>}
            </span>
          ))}
        </p>
        <p className="hero__tagline">{tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View My Work
          </a>
          <a className="btn btn--ghost" href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        </div>
      </div>
      <a className="hero__scroll" href="#about" aria-label="Scroll to about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>
        <span />
      </a>
    </section>
  )
}
