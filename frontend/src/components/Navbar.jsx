import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")); 
  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-secondary shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo - Left */}
        <Link to="/" className="text-2xl font-bold text-primary">
          LearnHub
        </Link>

        {/* Main Navigation - Center (Desktop) */}
        <div className="hidden md:flex space-x-8 font-medium text-textDark">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/courses" className="hover:text-primary transition">
            All Courses
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact Us
          </Link>
        </div>

        {/* Action Buttons - Right (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">

          {!user && (
            <>
              <Link
                to="/login"
                className="text-textDark hover:text-primary transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-primary text-accent px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="bg-primary text-accent px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-accent px-6 pb-6 space-y-4 text-textDark font-medium shadow">

          {/* Main Links */}
          <Link to="/" className="block hover:text-primary">Home</Link>
          <Link to="/courses" className="block hover:text-primary">All Courses</Link>
          <Link to="/about" className="block hover:text-primary">About Us</Link>
          <Link to="/contact" className="block hover:text-primary">Contact Us</Link>

          <hr className="my-3" />

          {/* Action Links */}
          {!user && (
            <>
              <Link to="/login" className="block hover:text-primary">Login</Link>
              <Link
                to="/register"
                className="block bg-primary text-accent px-4 py-2 rounded-md text-center"
              >
                Register
              </Link>
            </>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="block bg-primary text-accent px-4 py-2 rounded-md text-center"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
