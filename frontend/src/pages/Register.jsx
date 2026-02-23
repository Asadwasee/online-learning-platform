import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend Connection
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      if (response.data) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Start your learning journey today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">
              Full Name
            </label>
            <div className="group flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-blue-500 bg-slate-50">
              <User
                size={18}
                className="text-slate-400 mr-3 group-focus-within:text-blue-500 transition-colors"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full outline-none bg-transparent text-slate-700 placeholder:text-slate-300 font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">
              Email Address
            </label>
            <div className="group flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-blue-500 bg-slate-50">
              <Mail
                size={18}
                className="text-slate-400 mr-3 group-focus-within:text-blue-500 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-slate-700 placeholder:text-slate-300 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">
              Password
            </label>
            <div className="group flex items-center border-2 border-slate-100 rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-blue-500 bg-slate-50">
              <Lock
                size={18}
                className="text-slate-400 mr-3 group-focus-within:text-blue-500 transition-colors"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full outline-none bg-transparent text-slate-700 placeholder:text-slate-300 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transform transition-all active:scale-[0.98] shadow-xl shadow-blue-100 flex justify-center items-center disabled:bg-slate-300"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-slate-500 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
