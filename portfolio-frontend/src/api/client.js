const RAW_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

const CACHE_PREFIX = 'portfolio_cache_';

export function getCached(key, fallback) {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed !== undefined && parsed !== null) {
          return parsed;
        }
      }
    }
  } catch {
    // ignore storage errors
  }
  return fallback;
}

export function setCached(key, data) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
    }
  } catch {
    // ignore storage errors
  }
}

export function clearCache(key) {
  try {
    if (typeof window !== 'undefined') {
      if (key) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      } else {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(CACHE_PREFIX))
          .forEach((k) => localStorage.removeItem(k));
      }
    }
  } catch {
    // ignore storage errors
  }
}

async function get(path, fallback, cacheKey) {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    if (cacheKey) {
      setCached(cacheKey, data);
    }
    return data;
  } catch {
    // Backend not deployed yet, cold-starting, or unreachable —
    // use cached data if available, otherwise fallback
    if (cacheKey) {
      const cached = getCached(cacheKey, null);
      if (cached !== null) return cached;
    }
    return fallback;
  }
}

export function getProjects(fallback) {
  return get('/api/projects', fallback, 'projects');
}

export function getPosts(fallback) {
  return get('/api/posts', fallback, 'posts');
}

export function getPostBySlug(slug, fallback) {
  return get(`/api/posts/${slug}`, fallback, `post_${slug}`);
}

export function getAchievements(fallback) {
  return get('/api/achievements', fallback, 'achievements');
}

export function getEducation(fallback) {
  return get('/api/education', fallback, 'education');
}

export function getSkills(fallback) {
  return get('/api/skills', fallback, 'skills');
}

export async function getResumeUrl(fallback) {
  try {
    const res = await fetch(`${BASE_URL}/api/settings/resume`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const url = data?.resumeUrl || fallback;
    setCached('resume', url);
    return url;
  } catch {
    const cached = getCached('resume', null);
    if (cached) return cached;
    return fallback;
  }
}

export async function submitContact(payload) {
  let res;
  try {
    res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Backend server is unreachable. Please email directly.');
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || 'Failed to send message');
  }
  return res.json();
}

export async function login(username, password) {
  let res;
  try {
    res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new Error('Backend server is unreachable. Please make sure the backend is running.');
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || 'Invalid username or password');
  }
  return res.json();
}

// ---- Authenticated admin requests ----

const TOKEN_KEY = 'portfolio_admin_token';

function authHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function authedRequest(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error('SESSION_EXPIRED');
  }
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const adminApi = {
  // admin post listing includes unpublished drafts
  listPosts: () => authedRequest('GET', '/api/admin/posts'),

  createProject: async (data) => {
    const res = await authedRequest('POST', '/api/admin/projects', data);
    clearCache('projects');
    return res;
  },
  updateProject: async (id, data) => {
    const res = await authedRequest('PUT', `/api/admin/projects/${id}`, data);
    clearCache('projects');
    return res;
  },
  deleteProject: async (id) => {
    const res = await authedRequest('DELETE', `/api/admin/projects/${id}`);
    clearCache('projects');
    return res;
  },

  createPost: async (data) => {
    const res = await authedRequest('POST', '/api/admin/posts', data);
    clearCache('posts');
    return res;
  },
  updatePost: async (id, data) => {
    const res = await authedRequest('PUT', `/api/admin/posts/${id}`, data);
    clearCache('posts');
    return res;
  },
  deletePost: async (id) => {
    const res = await authedRequest('DELETE', `/api/admin/posts/${id}`);
    clearCache('posts');
    return res;
  },

  createAchievement: async (data) => {
    const res = await authedRequest('POST', '/api/admin/achievements', data);
    clearCache('achievements');
    return res;
  },
  updateAchievement: async (id, data) => {
    const res = await authedRequest('PUT', `/api/admin/achievements/${id}`, data);
    clearCache('achievements');
    return res;
  },
  deleteAchievement: async (id) => {
    const res = await authedRequest('DELETE', `/api/admin/achievements/${id}`);
    clearCache('achievements');
    return res;
  },

  createEducation: async (data) => {
    const res = await authedRequest('POST', '/api/admin/education', data);
    clearCache('education');
    return res;
  },
  updateEducation: async (id, data) => {
    const res = await authedRequest('PUT', `/api/admin/education/${id}`, data);
    clearCache('education');
    return res;
  },
  deleteEducation: async (id) => {
    const res = await authedRequest('DELETE', `/api/admin/education/${id}`);
    clearCache('education');
    return res;
  },

  createSkill: async (data) => {
    const res = await authedRequest('POST', '/api/admin/skills', data);
    clearCache('skills');
    return res;
  },
  updateSkill: async (id, data) => {
    const res = await authedRequest('PUT', `/api/admin/skills/${id}`, data);
    clearCache('skills');
    return res;
  },
  deleteSkill: async (id) => {
    const res = await authedRequest('DELETE', `/api/admin/skills/${id}`);
    clearCache('skills');
    return res;
  },

  getSettings: () => authedRequest('GET', '/api/admin/settings'),
  updateResumeUrl: async (resumeUrl) => {
    const res = await authedRequest('PUT', '/api/admin/settings/resume', { resumeUrl });
    clearCache('resume');
    return res;
  },

  listMessages: () => authedRequest('GET', '/api/admin/messages'),
  deleteMessage: (id) => authedRequest('DELETE', `/api/admin/messages/${id}`),
};
