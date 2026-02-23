import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend Login API Call
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      if (response.data.token) {
        // Token aur User Info save karna
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("Welcome back! Login Successful.");

        // Role ke mutabik redirect karna
        setTimeout(() => {
          if (response.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid Email or Password!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Login to continue learning
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="group flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary">
              <Mail
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="group flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary">
              <Lock
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-gray-400 group-focus-within:text-primary"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-gray-400 group-focus-within:text-primary"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
