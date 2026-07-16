import { useState, useEffect, useCallback } from 'react'

const API = 'https://api.github.com'

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`)
  }
  return res.json()
}

/**
 * Fetch public repositories for a GitHub user, newest first.
 * Respects a pinned list when provided.
 */
export function useGitHubRepos(username, { perPage = 9, pinned = [] } = {}) {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error | empty
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!username) {
      setStatus('error')
      setError('GitHub username not configured.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      let data = await fetchJSON(
        `${API}/users/${username}/repos?sort=updated&per_page=${perPage}&type=owner`
      )
      // Hide forks and archived noise unless pinned
      data = data.filter((r) => !r.fork)
      if (pinned.length) {
        const byName = Object.fromEntries(data.map((r) => [r.name, r]))
        data = pinned.map((n) => byName[n]).filter(Boolean)
      }
      if (!data.length) {
        setStatus('empty')
      } else {
        setRepos(data)
        setStatus('success')
      }
    } catch (err) {
      setError(err.message || 'Failed to load repositories.')
      setStatus('error')
    }
  }, [username, perPage, pinned.join(',')])

  useEffect(() => {
    load()
  }, [load])

  return { repos, status, error, reload: load }
}
