import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Start your learning journey today
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="group flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary">
              <User
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
