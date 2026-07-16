/**
 * Build a live, renderable preview URL for a GitHub repository.
 *
 * Strategy (in order of preference):
 *  1. GitHub Pages  -> https://<user>.github.io/<repo>
 *  2. Raw preview   -> https://htmlpreview.github.io/?https://github.com/<user>/<repo>/blob/HEAD/index.html
 *
 * Returns null when no previewable source can be determined.
 */
export function getPreviewUrl(repo, username) {
  if (!repo || !username) return null

  const ghPages = `https://${username}.github.io/${repo.name}`
  const raw = `https://htmlpreview.github.io/?https://github.com/${username}/${repo.name}/blob/HEAD/index.html`

  // Prefer raw HTML preview (always works for static repos with index.html).
  // GitHub Pages is returned as the "deployed" option when available.
  return { ghPages, raw, live: repo.has_pages ? ghPages : raw }
}

/**
 * Language -> color mapping for repo language badges.
 */
export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00B4AB',
}

export function languageColor(lang) {
  return LANGUAGE_COLORS[lang] || '#888888'
}
