import { useState } from 'react'
import { CONFIG } from '../config.js'

export default function Contact() {
  const { email, github } = CONFIG.profile
  const { scriptURL } = CONFIG.contact
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (!scriptURL) {
      setStatus({ type: 'info', message: 'Contact form is in demo mode. Wire up CONFIG.contact.scriptURL to send.' })
      return
    }

    setSending(true)
    setStatus({ type: '', message: '' })
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus({ type: 'success', message: 'Message sent successfully!' })
      form.reset()
    } catch {
      setStatus({ type: 'error', message: 'Error sending message. Try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <h2 className="section__title">Contact</h2>
        <p className="section__lead">
          Email: <a href={`mailto:${email}`}>{email}</a> · GitHub:{' '}
          <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">{github}</a>
        </p>

        <form className="contact-form" onSubmit={onSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required />
          <button type="submit" className="btn btn--primary" disabled={sending}>
            {sending ? 'Sending…' : 'Send Message'}
          </button>
          {status.message && <p className={`form-status form-status--${status.type || 'info'}`}>{status.message}</p>}
        </form>
      </div>
    </section>
  )
}
