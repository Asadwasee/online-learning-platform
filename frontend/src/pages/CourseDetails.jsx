import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        toast.error("Course details not found");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-dark font-medium">
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-20 text-center text-red-500">Course not found.</div>
    );
  }

  return (
    <section className="bg-light py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={course.image || course.thumbnail}
            alt={course.name}
            className="w-full rounded-2xl shadow-lg object-cover max-h-100"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-4xl font-bold text-dark">{course.name || course.title}</h1>

          <p className="mt-4 text-gray-600">
            Instructor: <span className="font-medium">{course.instructor}</span>
          </p>

          <div className="flex gap-4 mt-2">
            <p className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Code: {course.courseCode}
            </p>
          </div>

          <p className="mt-6 text-dark leading-relaxed text-lg">
            {course.description}
          </p>

          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <span className="text-3xl font-bold text-primary">
              ${course.price}
            </span>

            <button 
              onClick={() => toast.success("Redirecting to payment...")}
              className="bg-primary text-light px-8 py-3 rounded-lg font-bold hover:opacity-90 shadow-lg transition"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;