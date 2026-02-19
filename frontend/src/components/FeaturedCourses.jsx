import { useEffect, useState } from "react";
import Course from "../components/Course";

const dummyCourses = [
  {
    _id: "1",
    title: "Full Stack Web Development",
    instructor: "John Doe",
    price: 49,
    thumbnail: "/book.svg",
  },
  {
    _id: "2",
    title: "React Advanced Concepts",
    instructor: "Jane Smith",
    price: 39,
    thumbnail: "/book.svg",
  },
  {
    _id: "3",
    title: "JavaScript Advanced Concepts",
    instructor: "Jane Smith",
    price: 39,
    thumbnail: "/book.svg",
  },
  {
    _id: "4",
    title: "Node.js APIs",
    instructor: "Mark Lee",
    price: 59,
    thumbnail: "/book.svg",
  },
];

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Future API call here
        setCourses(dummyCourses);
      } catch (error) {
        console.error("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-16 bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark text-center">
          Popular Courses
        </h2>

        {loading ? (
          <p className="text-center mt-8">Loading courses...</p>
        ) : (
          <Course courses={courses} limit={3} />
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;
