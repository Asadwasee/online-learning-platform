import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // User data check
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const availableCourses = [
    "React",
    "JavaScript",
    "Python",
    "Node.js",
    "UI/UX",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const found = availableCourses.some((course) =>
      course.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (found) {
      navigate(`/courses?search=${searchTerm}`);
      setSearchTerm("");
      setIsOpen(false);
    } else {
      alert("Afsos! Yeh course filhal available nahi hai.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* 1. Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary shrink-0 flex items-center gap-2"
        >
          <BookOpen size={28} />
          <span>LearnHub</span>
        </Link>

        {/* 2. Search Bar (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 max-w-md mx-4 relative group"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-full border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-accent text-text-dark transition-all"
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-primary"
            size={18}
          />
        </form>

        {/* 3. Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-text-dark">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/courses" className="hover:text-primary transition">
            All Courses
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact Us
          </Link>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* Authentication Logic */}
          <div className="flex items-center space-x-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-text-dark hover:text-primary transition flex items-center gap-1"
                >
                  <User size={18} /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-accent px-5 py-2 rounded-full hover:bg-primary/90 shadow-md transition-all active:scale-95"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-primary font-bold flex items-center gap-1 hover:underline"
                  >
                    <LayoutDashboard size={18} /> Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-primary text-sm font-bold border border-primary px-3 py-1.5 rounded-lg hover:bg-primary/90 hover:text-white transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-accent px-6 py-6 space-y-4 border-t border-primary/10 shadow-xl animate-in slide-in-from-top duration-300">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-10 py-2 rounded-lg border border-primary/20 bg-secondary/30 focus:outline-none focus:ring-1 ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </form>

          <Link
            to="/"
            className="block text-text-dark font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block text-text-dark font-medium"
            onClick={() => setIsOpen(false)}
          >
            All Courses
          </Link>
          <Link
            to="/contact"
            className="block text-text-dark font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>

          <hr className="border-gray-100" />

          {!user ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="text-center py-2 text-text-dark border border-gray-200 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-accent py-2 rounded-lg text-center font-bold"
                onClick={() => setIsOpen(false)}
              >
                Register Now
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-primarytext-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
