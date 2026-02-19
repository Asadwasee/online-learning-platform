import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-primary to-indigo-600 opacity-95"></div>

      <motion.div
        className="relative max-w-4xl mx-auto text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Upgrade Your Skills Today
        </h2>

        <p className="mt-6 text-lg opacity-90 max-w-2xl mx-auto">
          Join thousands of learners building real-world skills with structured,
          practical courses.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:scale-105 transition transform"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition"
          >
            Browse Courses
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-10 text-sm opacity-80 flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span>No Credit Card Required</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span>Beginner Friendly</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span>Lifetime Access</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
