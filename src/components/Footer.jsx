import { CONFIG } from '../config.js'

export default function Footer() {
  const { name, github, email } = CONFIG.profile
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__name">{name}</p>
        <div className="footer__links">
          <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${email}`}>Email</a>
        </div>
        <p className="footer__copy">© {year} {name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
