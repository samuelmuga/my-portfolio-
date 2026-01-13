// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// === GitHub Repositories Fetch ===
const GITHUB_USERNAME = 'samuelmuga'; // ⚠️ CHANGE THIS TO YOUR ACTUAL GITHUB USERNAME
const reposContainer = document.getElementById('github-repos');
const loadingEl = document.getElementById('github-loading');
const errorEl = document.getElementById('github-error');

async function fetchGitHubRepos() {
    if (!GITHUB_USERNAME || GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME') {
        errorEl.textContent = 'Please set your GitHub username in script.js';
        errorEl.style.display = 'block';
        loadingEl.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            reposContainer.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        reposContainer.innerHTML = repos.map(repo => `
            <div class="repo-card" id="repo_card" >
                <h3><a href="${repo.html_url}" target="_blank"> ${repo.name}</a></h3>
                <p>${repo.description || 'No description available.'}</p>
                <div class="meta">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>Language: ${repo.language || 'N/A'}</span>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error(err);
        errorEl.textContent = 'Failed to load repositories. Check username or try again later.';
        errorEl.style.display = 'block';
    } finally {
        loadingEl.style.display = 'none';
    }
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

function openModal(title, desc) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
// Load repos when page loads
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyusfAoyqWBQdleOlGo8eBOPTHaLumSJTaYK1TY-j4rImdgzLoJbpGWjrSOxwiWI9jJqQ/exec";

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }),
  })
    .then(() => {
      status.innerHTML = "Message sent successfully!";
      form.reset();
    })
    .catch(() => {
      status.innerHTML = "Error sending message.";
    });
  
});

