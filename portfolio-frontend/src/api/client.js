const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function get(path, fallback) {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } catch (err) {
    // Backend not deployed yet, or unreachable — fall back to static content
    // so the site still renders correctly during development.
    return fallback;
  }
}

export function getProjects(fallback) {
  return get('/api/projects', fallback);
}

export function getPosts(fallback) {
  return get('/api/posts', fallback);
}

export function getPostBySlug(slug, fallback) {
  return get(`/api/posts/${slug}`, fallback);
}

export function getAchievements(fallback) {
  return get('/api/achievements', fallback);
}

export function getEducation(fallback) {
  return get('/api/education', fallback);
}

export async function submitContact(payload) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
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

  createProject: (data) => authedRequest('POST', '/api/admin/projects', data),
  updateProject: (id, data) => authedRequest('PUT', `/api/admin/projects/${id}`, data),
  deleteProject: (id) => authedRequest('DELETE', `/api/admin/projects/${id}`),

  createPost: (data) => authedRequest('POST', '/api/admin/posts', data),
  updatePost: (id, data) => authedRequest('PUT', `/api/admin/posts/${id}`, data),
  deletePost: (id) => authedRequest('DELETE', `/api/admin/posts/${id}`),

  createAchievement: (data) => authedRequest('POST', '/api/admin/achievements', data),
  updateAchievement: (id, data) => authedRequest('PUT', `/api/admin/achievements/${id}`, data),
  deleteAchievement: (id) => authedRequest('DELETE', `/api/admin/achievements/${id}`),

  createEducation: (data) => authedRequest('POST', '/api/admin/education', data),
  updateEducation: (id, data) => authedRequest('PUT', `/api/admin/education/${id}`, data),
  deleteEducation: (id) => authedRequest('DELETE', `/api/admin/education/${id}`),

   listMessages: () => authedRequest('GET', '/api/admin/messages'),
    deleteMessage: (id) => authedRequest('DELETE', `/api/admin/messages/${id}`),
};
