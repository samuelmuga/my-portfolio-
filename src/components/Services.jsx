import { CONFIG } from '../config.js'

export default function Services() {
  return (
    <section id="services" className="section section--alt">
      <div className="container">
        <h2 className="section__title">Services</h2>
        <p className="section__lead">What I can do for you and your business.</p>
        <div className="services-grid">
          {CONFIG.services.map((s) => (
            <article key={s.title} className="service">
              <div className="service__icon" aria-hidden="true">{s.icon}</div>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__desc">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
