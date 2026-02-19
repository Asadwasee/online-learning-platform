import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "/hero.jpg";

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-secondary to-blue-100 py-20 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
            Unlock Your Potential with
            <span className="text-primary"> Expert-Led Courses</span>
          </h1>

          <p className="mt-6 text-lg text-dark opacity-80">
            Learn in-demand skills from industry experts and grow your career at
            your own pace.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/courses"
              className="bg-primary text-light px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
            >
              Browse Courses
            </Link>

            <Link
              to="/register"
              className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-light transition"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroImage}
            alt="Online Learning"
            className="max-w-md w-full mix-blend-multiply"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
