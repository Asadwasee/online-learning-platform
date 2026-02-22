// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-gray-800 text-center">
//           Welcome Back
//         </h2>
//         <p className="text-gray-500 text-center mt-2">
//           Login to continue learning
//         </p>

//         {/* Form */}
//         <form className="mt-8 space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <div className="group flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary">
//               <Mail
//                 size={18}
//                 className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
//               />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="group flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary">
//               <Lock
//                 size={18}
//                 className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
//               />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff
//                     size={18}
//                     className="text-gray-400 group-focus-within:text-primary"
//                   />
//                 ) : (
//                   <Eye
//                     size={18}
//                     className="text-gray-400 group-focus-within:text-primary"
//                   />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Forgot Password */}
//           <div className="text-right text-sm">
//             <a href="#" className="text-primary hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center mt-6 text-gray-500">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-primary font-medium hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react'
import { loginAPI, setAuth } from '../services/api'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ── Validation ──────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!formData.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!formData.password) {
      errs.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  // ── Submit ───────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setErrors(errs)

    setLoading(true)
    setApiError('')
    try {
      const data = await loginAPI(formData.email, formData.password)
      setAuth(data.token, data.user)
      // Redirect admin to admin panel, others to home
      if (data.user?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ── UI Helper ────────────────────────────────────────────────────
  const inputClass = (field) =>
    `group flex items-center border rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Login to continue learning
        </p>

        {/* API Error Banner */}
        {apiError && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
            <AlertCircle size={16} />
            <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className={inputClass('email')}>
              <Mail
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className={inputClass('password')}>
              <Lock
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Forgot */}
          <div className="text-right text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" /> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
