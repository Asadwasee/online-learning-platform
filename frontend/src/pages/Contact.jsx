import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submit triggered with data:", formData);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      
      // Checking for any successful response
      if (res.data) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); 
      }
    } catch (error) {
      console.error("Axios Detail Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-20 px-6">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* LEFT SIDE - CONTACT INFO */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
          <p className="mt-4 text-gray-600 max-w-md">
            Have questions about our courses or need assistance? We're here to
            help you grow and succeed.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">support@learnhub.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Phone className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">+92 300 1234567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800 font-medium">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800">Send a Message</h3>

          {/* Form Start */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="group border border-gray-300 rounded-lg px-4 py-2 focus-within:border-primary">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full outline-none bg-transparent text-gray-700"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="group border border-gray-300 rounded-lg px-4 py-2 focus-within:border-primary">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent text-gray-700"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <div className="group border border-gray-300 rounded-lg px-4 py-2 focus-within:border-primary">
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full outline-none bg-transparent text-gray-700 resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:bg-gray-400"
            >
              {loading ? (
                <>Sending... <Loader2 className="animate-spin" size={18} /></>
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
          {/* Form End */}
        </div>
      </div>
    </div>
  );
};

export default Contact;