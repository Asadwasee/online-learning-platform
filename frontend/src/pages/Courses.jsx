import { useEffect, useState } from "react";
import Course from "../components/Course";
import axios from "axios";
import toast from "react-hot-toast";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (error) {
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <section className="py-16 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark text-center">
          All Courses
        </h2>

        {loading ? (
          <div className="text-center mt-20">Loading amazing courses...</div>
        ) : (
          <Course courses={courses} />
        )}
      </div>
    </section>
  );
};

export default Courses;