import { languageColor } from '../utils/github.js'

export default function RepoCard({ repo, onPreview }) {
  const lang = repo.language
  const hasPreview = Boolean(repo.__preview)
  return (
    <article className="repo-card">
      <div className="repo-card__top">
        <h3 className="repo-card__name">
          <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
        </h3>
        {repo.fork && <span className="badge badge--muted">fork</span>}
        {repo.archived && <span className="badge badge--muted">archived</span>}
      </div>

      <p className="repo-card__desc">{repo.description || 'No description available.'}</p>

      <div className="repo-card__meta">
        {lang && (
          <span className="lang">
            <span className="lang__dot" style={{ background: languageColor(lang) }} />
            {lang}
          </span>
        )}
        <span title="Stars">★ {repo.stargazers_count}</span>
        <span title="Forks">⑂ {repo.forks_count}</span>
        {repo.homepage && (
          <a className="repo-card__home" href={repo.homepage} target="_blank" rel="noreferrer">Live ↗</a>
        )}
      </div>

      <div className="repo-card__actions">
        <a className="btn btn--sm" href={repo.html_url} target="_blank" rel="noreferrer">Code</a>
        <button
          className="btn btn--sm btn--primary"
          onClick={() => onPreview(repo)}
          disabled={!hasPreview}
          title={hasPreview ? 'Open live HTML preview' : 'No previewable page'}
        >
          Preview
        </button>
      </div>
    </article>
  )
}
