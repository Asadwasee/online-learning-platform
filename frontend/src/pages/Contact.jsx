// import { useState } from "react";
// import { Mail, Phone, MapPin, Send } from "lucide-react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData); // backend integration later
//   };

//   return (
//     <div className="min-h-screen bg-secondary py-20 px-6">
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
//         {/* LEFT SIDE - CONTACT INFO */}
//         <div>
//           <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>

//           <p className="mt-4 text-gray-600 max-w-md">
//             Have questions about our courses or need assistance? We're here to
//             help you grow and succeed.
//           </p>

//           <div className="mt-10 space-y-6">
//             <div className="flex items-center gap-4">
//               <div className="bg-primary/10 p-3 rounded-xl">
//                 <Mail className="text-primary" size={20} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="text-gray-800 font-medium">
//                   support@learnhub.com
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="bg-primary/10 p-3 rounded-xl">
//                 <Phone className="text-primary" size={20} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Phone</p>
//                 <p className="text-gray-800 font-medium">+92 300 1234567</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="bg-primary/10 p-3 rounded-xl">
//                 <MapPin className="text-primary" size={20} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Location</p>
//                 <p className="text-gray-800 font-medium">Lahore, Pakistan</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE - FORM */}
//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <h3 className="text-2xl font-semibold text-gray-800">
//             Send a Message
//           </h3>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="group border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 focus-within:border-primary">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                   className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <div className="group border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 focus-within:border-primary">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
//                 />
//               </div>
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Message
//               </label>
//               <div className="group border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 focus-within:border-primary">
//                 <textarea
//                   name="message"
//                   rows="4"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Write your message..."
//                   className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400 resize-none"
//                 />
//               </div>
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
//             >
//               Send Message
//               <Send size={18} />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react'
import { submitContactAPI } from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // ✅ Validation
  const validate = () => {
    const errs = {}

    if (!formData.name.trim()) errs.name = 'Name is required'

    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Enter a valid email'

    if (!formData.message.trim()) errs.message = 'Message is required'
    else if (formData.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters'

    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))

    setApiError('')
  }

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setApiError('')

    try {
      await submitContactAPI(formData.name, formData.email, formData.message)

      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputWrapClass = (field) =>
    `group border rounded-lg px-4 py-2 transition-all duration-200 focus-within:border-primary ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`

  return (
    <div className="min-h-screen bg-secondary py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* LEFT — Contact Info */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>

          <p className="mt-4 text-gray-600 max-w-md">
            Have questions about our courses or need assistance? We're here to
            help you grow and succeed.
          </p>

          <div className="mt-10 space-y-6">
            {[
              { Icon: Mail, label: 'Email', value: 'support@learnhub.com' },
              { Icon: Phone, label: 'Phone', value: '+92 300 1234567' },
              { Icon: MapPin, label: 'Location', value: 'Lahore, Pakistan' }
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Icon className="text-primary" size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-gray-800 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800">
            Send a Message
          </h3>

          {/* SUCCESS */}
          {success ? (
            <div className="mt-8 flex flex-col items-center py-10 text-center">
              <CheckCircle size={56} className="text-green-500" />

              <h4 className="text-xl font-semibold text-gray-800 mt-2">
                Message Sent!
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                We'll get back to you within 24 hours.
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="mt-3 text-primary text-sm hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {apiError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
                  <AlertCircle size={16} />
                  <span>{apiError}</span>
                </div>
              )}

              {/* NAME */}
              <div>
                <label className="block text-sm mb-2">Full Name</label>

                <div className={inputWrapClass('name')}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-2">Email</label>

                <div className={inputWrapClass('email')}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm mb-2">Message</label>

                <div className={inputWrapClass('message')}>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full outline-none bg-transparent resize-none"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
