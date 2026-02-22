// import { useEffect, useState } from "react";
// import Course from "../components/Course";

// const dummyCourses = [
//   {
//     _id: "1",
//     title: "Full Stack Web Development",
//     instructor: "John Doe",
//     price: 49,
//     thumbnail: "/book.svg",
//   },
//   {
//     _id: "2",
//     title: "React Advanced Concepts",
//     instructor: "Jane Smith",
//     price: 39,
//     thumbnail: "/book.svg",
//   },
//   {
//     _id: "3",
//     title: "JavaScript Advanced Concepts",
//     instructor: "Jane Smith",
//     price: 39,
//     thumbnail: "/book.svg",
//   },
//   {
//     _id: "4",
//     title: "Node.js APIs",
//     instructor: "Mark Lee",
//     price: 59,
//     thumbnail: "/book.svg",
//   },
// ];

// const Courses = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Future API call
//     setCourses(dummyCourses);
//   }, []);

//   return (
//     <section className="py-16 bg-light">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-dark text-center">
//           All Courses
//         </h2>

//         <Course courses={courses} />
//       </div>
//     </section>
//   );
// };

// export default Courses;

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Course from '../components/Course'
import { getAllCoursesAPI } from '../services/api'
import { Search, BookOpen, AlertCircle } from 'lucide-react'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Read ?search= from URL (Navbar search redirects here)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search).get('search') || ''

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCoursesAPI()
        setCourses(data)
        setFiltered(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // Apply URL search term on initial load
  useEffect(() => {
    if (urlSearch) {
      setSearchTerm(urlSearch)
    }
  }, [urlSearch])

  // Filter whenever searchTerm or courses change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(courses)
    } else {
      const lower = searchTerm.toLowerCase()
      setFiltered(
        courses.filter(
          (c) =>
            c.title?.toLowerCase().includes(lower) ||
            c.instructor?.toLowerCase().includes(lower) ||
            c.category?.toLowerCase().includes(lower)
        )
      )
    }
  }, [searchTerm, courses])

  return (
    <section className="py-16 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dark">All Courses</h2>
          <p className="text-gray-500 mt-2">
            Explore our complete course library
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses by title, instructor..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
          />
        </div>

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center py-20 gap-4 text-gray-400">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p>Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center gap-2 text-red-500 py-10">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg">No courses found for "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary text-sm hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-4 text-center">
              Showing {filtered.length} course{filtered.length !== 1 ? 's' : ''}
            </p>
            <Course courses={filtered} />
          </>
        )}
      </div>
    </section>
  )
}

export default Courses
