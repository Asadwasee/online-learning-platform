import { Link } from "react-router-dom";

const Course = ({ courses, limit }) => {
  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-12">
      {displayedCourses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition flex flex-col justify-between"
        >
          <img
            src={course.image || course.thumbnail}
            alt={course.name}
            className="h-48 w-full object-cover rounded-lg"
          />
          <h3 className="mt-4 text-lg font-semibold text-dark">
            {course.name || course.title}
          </h3>

          <p className="text-sm text-gray-500 mt-2">{course.instructor}</p>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-primary font-bold">${course.price}</span>

            <Link
              to={`/courses/${course._id}`}
              className="bg-primary text-light px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Course;
