// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const dummyCourses = [
//   {
//     _id: "1",
//     title: "Full Stack Web Development",
//     instructor: "John Doe",
//     price: 49,
//     thumbnail: "/book.svg",
//     description:
//       "Learn MERN stack from scratch and build real-world applications.",
//     duration: "12 Weeks",
//     level: "Beginner to Advanced",
//   },
//   {
//     _id: "2",
//     title: "React Advanced Concepts",
//     instructor: "Jane Smith",
//     price: 39,
//     thumbnail: "/book.svg",
//     description:
//       "Master React hooks, performance optimization and advanced patterns.",
//     duration: "8 Weeks",
//     level: "Intermediate",
//   },
// ];

// const CourseDetails = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         //  Future Backend Ready
//         // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`);
//         // const data = await res.json();
//         // setCourse(data);

//         // Temporary dummy
//         const found = dummyCourses.find((c) => c._id === id);
//         setCourse(found);
//       } catch (error) {
//         console.error("Failed to fetch course details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="py-20 text-center text-dark">
//         Loading course details...
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="py-20 text-center text-red-500">Course not found.</div>
//     );
//   }

//   return (
//     <section className="bg-light py-16">
//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
//         {/* LEFT IMAGE */}
//         <div>
//           <img
//             src={course.thumbnail}
//             alt={course.title}
//             className="w-full rounded-2xl shadow-lg"
//           />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div>
//           <h1 className="text-4xl font-bold text-dark">{course.title}</h1>

//           <p className="mt-4 text-gray-600">
//             Instructor: <span className="font-medium">{course.instructor}</span>
//           </p>

//           <p className="mt-2 text-gray-600">Duration: {course.duration}</p>

//           <p className="mt-2 text-gray-600">Level: {course.level}</p>

//           <p className="mt-6 text-dark leading-relaxed">{course.description}</p>

//           <div className="mt-8 flex items-center justify-between">
//             <span className="text-2xl font-bold text-primary">
//               ${course.price}
//             </span>

//             <button className="bg-primary text-light px-6 py-3 rounded-lg hover:opacity-90 transition">
//               Enroll Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CourseDetails;

import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCourseByIdAPI } from '../services/api'
import {
  Clock,
  BarChart2,
  User,
  ArrowLeft,
  AlertCircle,
  BookOpen
} from 'lucide-react'

const CourseDetails = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseByIdAPI(id)
        setCourse(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-400">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p>Loading course details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-red-500">
        <AlertCircle size={40} />
        <p className="text-lg font-medium">{error}</p>
        <Link
          to="/courses"
          className="text-primary text-sm hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Courses
        </Link>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-400">
        <BookOpen size={48} className="opacity-40" />
        <p className="text-lg">Course not found.</p>
        <Link
          to="/courses"
          className="text-primary text-sm hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Browse Courses
        </Link>
      </div>
    )
  }

  return (
    <section className="bg-light py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-primary text-sm hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Back to Courses
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT – Image */}
          <div>
            <img
              src={course.thumbnail || '/book.svg'}
              alt={course.title}
              className="w-full rounded-2xl shadow-lg object-cover max-h-80"
            />

            {/* Stats Pills */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <Clock className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-semibold text-dark">
                  {course.duration || 'N/A'}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <BarChart2 className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-gray-500">Level</p>
                <p className="text-sm font-semibold text-dark">
                  {course.level || 'All Levels'}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <User className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-gray-500">Instructor</p>
                <p className="text-sm font-semibold text-dark truncate">
                  {course.instructor || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT – Content */}
          <div className="flex flex-col justify-start">
            {course.category && (
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                {course.category}
              </span>
            )}

            <h1 className="text-4xl font-bold text-dark leading-tight">
              {course.title}
            </h1>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {course.description ||
                'No description available for this course.'}
            </p>

            {/* What You'll Learn */}
            {course.topics && course.topics.length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow p-5">
                <h3 className="font-semibold text-dark mb-3">
                  What You'll Learn
                </h3>
                <ul className="space-y-2">
                  {course.topics.map((topic, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-primary font-bold mt-0.5">✓</span>{' '}
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price + Enroll */}
            <div className="mt-8 flex items-center justify-between bg-white rounded-xl shadow p-5">
              <div>
                <p className="text-xs text-gray-400 mb-1">Course Price</p>
                <span className="text-3xl font-bold text-primary">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
              </div>
              <button className="bg-primary text-white px-8 py-3 rounded-xl hover:opacity-90 transition font-semibold shadow-md">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseDetails
