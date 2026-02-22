const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ─── Auth Helpers ───────────────────────────────────────────────
export const getToken = () => localStorage.getItem('token')

export const setAuth = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
})

// ─── Auth APIs ───────────────────────────────────────────────────
export const registerAPI = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data
}

export const loginAPI = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data
}

// ─── Course APIs ─────────────────────────────────────────────────
export const getAllCoursesAPI = async () => {
  const res = await fetch(`${BASE_URL}/api/courses`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch courses')
  return data
}

export const getCourseByIdAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/api/courses/${id}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch course')
  return data
}

export const createCourseAPI = async (courseData) => {
  const res = await fetch(`${BASE_URL}/api/courses`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(courseData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to create course')
  return data
}

export const updateCourseAPI = async (id, courseData) => {
  const res = await fetch(`${BASE_URL}/api/courses/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(courseData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update course')
  return data
}

export const deleteCourseAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/api/courses/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to delete course')
  return data
}

// ─── Contact API ─────────────────────────────────────────────────
export const submitContactAPI = async (name, email, message) => {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to send message')
  return data
}
