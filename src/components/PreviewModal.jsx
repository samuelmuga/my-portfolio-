import { useEffect, useState } from 'react'

export default function PreviewModal({ repo, username, onClose }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!repo) return
    setFailed(false)
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [repo, onClose])

  if (!repo) return null

  const { raw } = repo.__preview
  const safeSrc = raw.replace('?', '%3F')

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${repo.name} preview`}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close preview">×</button>
        <div className="modal__head">
          <h3 className="modal__title">{repo.name}</h3>
          <div className="modal__links">
            <a href={repo.html_url} target="_blank" rel="noreferrer">Repository</a>
            <a href={raw} target="_blank" rel="noreferrer">Open full ↗</a>
          </div>
        </div>
        <p className="modal__desc">{repo.description || 'No description available.'}</p>
        <div className="modal__frame">
          {failed ? (
            <div className="preview-fallback">
              <span className="preview-fallback__icon" aria-hidden="true">🔍</span>
              <p className="preview-fallback__title">This repository isn't previewable</p>
              <p className="preview-fallback__text">
                We couldn't load a live preview. This usually means the repo has no
                deployable <code>index.html</code> page or the host blocked the request.
              </p>
              <div className="preview-fallback__actions">
                <a className="btn btn--sm btn--primary" href={repo.html_url} target="_blank" rel="noreferrer">View code</a>
                {repo.homepage && (
                  <a className="btn btn--sm" href={repo.homepage} target="_blank" rel="noreferrer">Live site ↗</a>
                )}
              </div>
            </div>
          ) : (
            <iframe
              title={`${repo.name} live preview`}
              src={safeSrc}
              loading="lazy"
              onError={() => setFailed(true)}
              onLoad={(e) => {
                if (!e.currentTarget.contentWindow || !e.currentTarget.srcdoc) {
                  const doc = e.currentTarget.contentDocument
                  if (doc && (doc.title.includes('404') || /404|not found/i.test(doc.body?.innerText || ''))) {
                    setFailed(true)
                  }
                }
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          )}
        </div>
      </div>
    </div>
  )
}
