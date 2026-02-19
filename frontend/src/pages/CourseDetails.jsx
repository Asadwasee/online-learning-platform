import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const dummyCourses = [
  {
    _id: "1",
    title: "Full Stack Web Development",
    instructor: "John Doe",
    price: 49,
    thumbnail: "/book.svg",
    description:
      "Learn MERN stack from scratch and build real-world applications.",
    duration: "12 Weeks",
    level: "Beginner to Advanced",
  },
  {
    _id: "2",
    title: "React Advanced Concepts",
    instructor: "Jane Smith",
    price: 39,
    thumbnail: "/book.svg",
    description:
      "Master React hooks, performance optimization and advanced patterns.",
    duration: "8 Weeks",
    level: "Intermediate",
  },
];

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        //  Future Backend Ready
        // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`);
        // const data = await res.json();
        // setCourse(data);

        // Temporary dummy
        const found = dummyCourses.find((c) => c._id === id);
        setCourse(found);
      } catch (error) {
        console.error("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-dark">
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
    <section className="bg-light py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-4xl font-bold text-dark">{course.title}</h1>

          <p className="mt-4 text-gray-600">
            Instructor: <span className="font-medium">{course.instructor}</span>
          </p>

          <p className="mt-2 text-gray-600">Duration: {course.duration}</p>

          <p className="mt-2 text-gray-600">Level: {course.level}</p>

          <p className="mt-6 text-dark leading-relaxed">{course.description}</p>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${course.price}
            </span>

            <button className="bg-primary text-light px-6 py-3 rounded-lg hover:opacity-90 transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
