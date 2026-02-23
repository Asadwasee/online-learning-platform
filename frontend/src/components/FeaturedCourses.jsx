import { useEffect, useState } from "react";
import axios from "axios";
import Course from "../components/Course";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Backend API call to get all courses
        const res = await axios.get("http://localhost:5000/api/courses");

        // Agar backend sahi response de raha hai
        if (res.data) {
          setCourses(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured courses:", error);
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
          <div className="flex justify-center items-center mt-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          /* limit={3} ensures only 3 cards show on Home Page */
          <Course courses={courses} limit={3} />
        )}

        {/* View All Button for UX */}
        {!loading && courses.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => (window.location.href = "/courses")}
              className="border-2 border-primary text-primary px-8 py-2 rounded-full font-bold hover:bg-primary hover:text-white transition-all"
            >
              View All Courses
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;
