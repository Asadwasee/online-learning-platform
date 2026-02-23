import { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusCircle,
  BookOpen,
  Users,
  LayoutDashboard,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Loader2,
  DollarSign,
  Image as ImageIcon,
  Menu,
  X,
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    price: "",
    courseCode: "",
    description: "",
    image: "/images/course-default.jpg",
  });

  const fetchCourses = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/courses/${editId}`,
          formData,
          config,
        );
        setMessage({ type: "success", text: "Course updated successfully" });
      } else {
        await axios.post("http://localhost:5000/api/courses", formData, config);
        setMessage({ type: "success", text: "New course published" });
      }

      setFormData({
        name: "",
        instructor: "",
        price: "",
        courseCode: "",
        description: "",
        image: "/images/course-default.svg",
      });
      setIsEditing(false);
      setEditId(null);
      fetchCourses();
      setTimeout(() => setActiveTab("list"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Operation failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (course) => {
    setFormData({
      name: course.name,
      instructor: course.instructor,
      price: course.price,
      courseCode: course.courseCode,
      description: course.description,
      image: course.image,
    });
    setEditId(course._id);
    setIsEditing(true);
    setActiveTab("add");
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (err) {
      alert("Error: Could not delete course.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 font-sans relative">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white p-8 flex flex-col shadow-2xl transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="mb-12 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-blue-400 italic">
            LearnHub{" "}
            <span className="text-white not-italic leading-tight text-sm font-light">
              ADMIN
            </span>
          </h1>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "list", label: "Manage Courses", icon: BookOpen },
            {
              id: "add",
              label: isEditing ? "Edit Course" : "Create Course",
              icon: PlusCircle,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
                if (item.id !== "add") {
                  setIsEditing(false);
                  setFormData({
                    name: "",
                    instructor: "",
                    price: "",
                    courseCode: "",
                    description: "",
                    image: "/images/course-default.jpg",
                  });
                }
              }}
              className={`flex items-center w-full p-4 rounded-xl font-medium transition-all duration-300 ${activeTab === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <item.icon className="mr-4" size={20} /> {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-10 overflow-y-auto w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="font-bold text-slate-800">Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-slate-900 text-white rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12">
          <StatCard
            title="Total Courses"
            count={courses.length}
            icon={BookOpen}
            color="text-blue-600"
          />
          <StatCard
            title="Total Earnings"
            count={`$${courses.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)}`}
            icon={DollarSign}
            color="text-green-600"
          />
          <StatCard
            title="Active Students"
            count="1,248"
            icon={Users}
            color="text-purple-600"
          />
        </div>

        {activeTab === "dashboard" && (
          <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Welcome Back, Asad
            </h2>
            <p className="text-slate-500 mt-4 text-base lg:text-lg">
              Your platform is running smoothly. You have {courses.length}{" "}
              active courses.
            </p>
          </div>
        )}

        {activeTab === "add" && (
          <div className="bg-white p-6 lg:p-10 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
            <h2 className="text-xl lg:text-2xl font-bold mb-8 flex items-center text-slate-900">
              <PlusCircle className="mr-3 text-blue-600" />{" "}
              {isEditing ? "Update Course Details" : "New Course Details"}
            </h2>

            {message.text && (
              <div
                className={`p-4 mb-8 rounded-xl flex items-center font-medium ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="mr-3" />
                ) : (
                  <AlertCircle className="mr-3" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8"
            >
              <InputField
                label="Course Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Course Code"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                required
              />
              <InputField
                label="Instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
              />
              <InputField
                label="Price ($)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <div className="md:col-span-2">
                <InputField
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all resize-none bg-slate-50"
                  required
                ></textarea>
              </div>

              <button
                disabled={loading}
                className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl flex justify-center items-center uppercase tracking-widest"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-3" />
                ) : isEditing ? (
                  "Update Course"
                ) : (
                  "Publish Course"
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === "list" && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-lg lg:text-xl">
                All Available Courses
              </h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                {courses.length} Items
              </span>
            </div>

            {fetchLoading ? (
              <div className="p-20 text-center">
                <Loader2
                  className="animate-spin mx-auto text-blue-600 mb-4"
                  size={40}
                />{" "}
                <p>Loading Data...</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
                      <tr>
                        <th className="p-6">Details</th>
                        <th className="p-6">Code</th>
                        <th className="p-6">Price</th>
                        <th className="p-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {courses.map((course) => (
                        <tr
                          key={course._id}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          <td className="p-6 flex items-center">
                            <img
                              src={course.image}
                              className="w-12 h-12 rounded-xl mr-4 object-cover border"
                              alt=""
                            />
                            <div>
                              <div className="font-bold text-slate-900">
                                {course.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {course.instructor}
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded text-slate-600 uppercase">
                              {course.courseCode}
                            </span>
                          </td>
                          <td className="p-6 font-black text-blue-600">
                            ${course.price}
                          </td>
                          <td className="p-6">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditClick(course)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => deleteCourse(course._id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-slate-100">
                  {courses.map((course) => (
                    <div key={course._id} className="p-4 flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.image}
                          className="w-16 h-16 rounded-xl object-cover"
                          alt=""
                        />
                        <div>
                          <div className="font-bold text-slate-900 leading-tight">
                            {course.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {course.instructor}
                          </div>
                          <div className="mt-1 text-blue-600 font-bold">
                            ${course.price}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                        <span className="text-[10px] font-mono uppercase bg-white px-2 py-1 rounded border">
                          {course.courseCode}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(course)}
                            className="p-2 bg-white text-blue-600 rounded-lg shadow-sm"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteCourse(course._id)}
                            className="p-2 bg-white text-red-600 rounded-lg shadow-sm"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon: Icon, color }) => (
  <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center">
    <div className={`p-3 lg:p-4 rounded-2xl bg-slate-50 mr-4 lg:mr-6 ${color}`}>
      <Icon size={28} />
    </div>
    <div>
      <p className="text-slate-400 font-medium text-xs lg:text-sm">{title}</p>
      <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mt-1">
        {count}
      </h3>
    </div>
  </div>
);

const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
      {label}
    </label>
    <input
      {...props}
      className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all bg-slate-50 font-medium text-sm lg:text-base"
    />
  </div>
);

export default Admin;
