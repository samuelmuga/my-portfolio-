import { useState, useMemo } from 'react'
import { CONFIG } from '../config.js'
import { useGitHubRepos } from '../hooks/useGitHubRepos.js'
import { getPreviewUrl } from '../utils/github.js'
import RepoCard from './RepoCard.jsx'
import PreviewModal from './PreviewModal.jsx'

export default function Portfolio() {
  const { username, perPage, pinned } = CONFIG.github
  const { repos, status, error, reload } = useGitHubRepos(username, { perPage, pinned })
  const [preview, setPreview] = useState(null)

  const enriched = useMemo(
    () =>
      repos.map((r) => ({
        ...r,
        __preview: getPreviewUrl(r, username),
      })),
    [repos, username]
  )

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="section__title">GitHub Portfolio</h2>
        <p className="section__lead">
          My latest public projects, fetched live from GitHub — with instant HTML previews.
        </p>

        {status === 'loading' && (
          <div className="state state--loading">
            <span className="spinner" /> Loading repositories…
          </div>
        )}

        {status === 'error' && (
          <div className="state state--error">
            <p>{error || 'Failed to load repositories.'}</p>
            <button className="btn btn--sm" onClick={reload}>Retry</button>
          </div>
        )}

        {status === 'empty' && (
          <div className="state">No public repositories found.</div>
        )}

        {status === 'success' && (
          <div className="portfolio-grid">
            {enriched.map((repo) => (
              <RepoCard key={repo.id} repo={repo} onPreview={setPreview} />
            ))}
          </div>
        )}
      </div>

      <PreviewModal repo={preview} username={username} onClose={() => setPreview(null)} />
    </section>
  )
}
