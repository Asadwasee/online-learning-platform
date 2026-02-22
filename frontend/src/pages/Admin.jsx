import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAllCoursesAPI,
  createCourseAPI,
  updateCourseAPI,
  deleteCourseAPI
} from '../services/api'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader,
  AlertCircle,
  BookOpen,
  LogOut,
  LayoutDashboard
} from 'lucide-react'

// ── Empty form state ─────────────────────────────────────────────
const emptyForm = {
  title: '',
  instructor: '',
  price: '',
  category: '',
  duration: '',
  level: '',
  thumbnail: '',
  description: ''
}

const Admin = () => {
  const navigate = useNavigate()

  // Guard: only admin can access
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login')
    }
  }, [user,navigate])

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Delete confirm state
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // ── Fetch Courses ────────────────────────────────────────────────
  const fetchCourses = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllCoursesAPI()
      setCourses(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // ── Modal Open/Close ─────────────────────────────────────────────
  const openAddModal = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setFormErrors({})
    setSaveError('')
    setShowModal(true)
  }

  const openEditModal = (course) => {
    setEditingId(course._id)
    setFormData({
      title: course.title || '',
      instructor: course.instructor || '',
      price: course.price ?? '',
      category: course.category || '',
      duration: course.duration || '',
      level: course.level || '',
      thumbnail: course.thumbnail || '',
      description: course.description || ''
    })
    setFormErrors({})
    setSaveError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
  }

  // ── Validation ───────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!formData.title.trim()) errs.title = 'Title is required'
    if (!formData.instructor.trim()) errs.instructor = 'Instructor is required'
    if (formData.price === '' || isNaN(Number(formData.price)))
      errs.price = 'Valid price is required'
    if (!formData.description.trim())
      errs.description = 'Description is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ── Save (Create or Update) ──────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setFormErrors(errs)

    setSaving(true)
    setSaveError('')
    try {
      const payload = { ...formData, price: Number(formData.price) }
      if (editingId) {
        await updateCourseAPI(editingId, payload)
      } else {
        await createCourseAPI(payload)
      }
      closeModal()
      await fetchCourses()
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ───────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteCourseAPI(deleteId)
      setDeleteId(null)
      await fetchCourses()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // ── Input helper ─────────────────────────────────────────────────
  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary/40 ${
      formErrors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <LayoutDashboard size={24} />
            <span>Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Welcome, <strong>{user?.name || 'Admin'}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 border border-red-300 px-3 py-1.5 rounded-lg transition"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: 'Total Courses',
              value: courses.length,
              color: 'bg-blue-500'
            },
            {
              label: 'Free Courses',
              value: courses.filter((c) => c.price === 0).length,
              color: 'bg-green-500'
            },
            {
              label: 'Paid Courses',
              value: courses.filter((c) => c.price > 0).length,
              color: 'bg-purple-500'
            }
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow p-6 flex items-center gap-4"
            >
              <div className={`${color} text-white rounded-xl p-3`}>
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Course Table Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark">Course Management</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition font-semibold shadow"
          >
            <Plus size={18} /> Add Course
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
            <p>No courses yet. Click "Add Course" to get started.</p>
          </div>
        ) : (
          /* ── Course Table ── */
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      '#',
                      'Thumbnail',
                      'Title',
                      'Instructor',
                      'Category',
                      'Price',
                      'Level',
                      'Actions'
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-gray-500 font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {courses.map((course, i) => (
                    <tr
                      key={course._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                      <td className="px-5 py-4">
                        <img
                          src={course.thumbnail || '/book.svg'}
                          alt={course.title}
                          className="w-12 h-10 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-5 py-4 font-medium text-dark max-w-45 truncate">
                        {course.title}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {course.instructor}
                      </td>
                      <td className="px-5 py-4">
                        {course.category ? (
                          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-5 py-4 font-semibold text-primary">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {course.level || '—'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(course)}
                            className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition text-xs font-medium"
                          >
                            <Pencil size={13} /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(course._id)}
                            className="flex items-center gap-1 text-red-500 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg transition text-xs font-medium"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ── Add / Edit Modal ─────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-dark">
                {editingId ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSave}
              className="px-6 py-6 space-y-4"
              noValidate
            >
              {saveError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
                  <AlertCircle size={16} /> {saveError}
                </div>
              )}

              {/* Row 1: Title + Instructor */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Development"
                    className={inputClass('title')}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructor <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={inputClass('instructor')}
                  />
                  {formErrors.instructor && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.instructor}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Price + Category */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0 for free"
                    className={inputClass('price')}
                  />
                  {formErrors.price && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.price}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass('category')}
                  >
                    <option value="">Select category</option>
                    {[
                      'Web Development',
                      'Mobile Development',
                      'Data Science',
                      'UI/UX Design',
                      'DevOps',
                      'Cybersecurity',
                      'Other'
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Duration + Level */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 8 Weeks"
                    className={inputClass('duration')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className={inputClass('level')}
                  >
                    <option value="">Select level</option>
                    {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(
                      (l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass('thumbnail')}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Course description..."
                  className={`${inputClass('description')} resize-none`}
                />
                {formErrors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.description}
                  </p>
                )}
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader size={16} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />{' '}
                      {editingId ? 'Update Course' : 'Add Course'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-dark">Delete Course?</h3>
            <p className="text-gray-500 text-sm mt-2">
              This action cannot be undone. The course will be permanently
              removed.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader size={16} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
