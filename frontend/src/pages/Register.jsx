// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-gray-800 text-center">
//           Create Account
//         </h2>
//         <p className="text-gray-500 text-center mt-2">
//           Start your learning journey today
//         </p>

//         {/* Form */}
//         <form className="mt-8 space-y-5">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name
//             </label>
//             <div className="group flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary">
//               <User
//                 size={18}
//                 className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
//               />
//             </div>
//           </div>

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

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             Register
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center mt-6 text-gray-500">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-primary font-medium hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react'
import { registerAPI, setAuth } from '../services/api'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  // ── Password Strength ────────────────────────────────────────────
  const getStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 6) score++
    if (pwd.length >= 10) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }
  const strengthLabel = [
    '',
    'Very Weak',
    'Weak',
    'Fair',
    'Strong',
    'Very Strong'
  ]
  const strengthColor = [
    '',
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-blue-500',
    'bg-green-500'
  ]
  const strength = getStrength(formData.password)

  // ── Validation ───────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters'
    }
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
    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      const data = await registerAPI(
        formData.name,
        formData.email,
        formData.password
      )
      setAuth(data.token, data.user)
      setSuccess('Account created successfully! Redirecting...')
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `group flex items-center border rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-primary ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Start your learning journey today
        </p>

        {/* Success Banner */}
        {success && (
          <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-300 text-green-600 text-sm rounded-lg px-4 py-3">
            <CheckCircle size={16} /> <span>{success}</span>
          </div>
        )}

        {/* API Error Banner */}
        {apiError && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
            <AlertCircle size={16} /> <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className={inputClass('name')}>
              <User
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

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
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
            {/* Password Strength Bar */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 h-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        i <= strength ? strengthColor[strength] : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  Strength:{' '}
                  <span className="font-medium">{strengthLabel[strength]}</span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className={inputClass('confirmPassword')}>
              <Lock
                size={18}
                className="text-gray-400 mr-2 group-focus-within:text-primary transition-colors"
              />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" /> Creating
                account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
