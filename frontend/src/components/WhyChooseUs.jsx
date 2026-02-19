import { Search, BookOpen, Award } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="bg-secondary py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-dark">
          Simple Steps to Success
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mt-12">
          <div className="bg-light p-8 rounded-xl shadow-md">
            <Search className="mx-auto text-primary" size={40} />
            <h3 className="mt-6 font-semibold text-dark text-xl">
              Explore Courses
            </h3>
            <p className="mt-3 text-gray-600">
              Discover industry-relevant courses tailored for your growth.
            </p>
          </div>

          <div className="bg-light p-8 rounded-xl shadow-md">
            <BookOpen className="mx-auto text-primary" size={40} />
            <h3 className="mt-6 font-semibold text-dark text-xl">
              Learn & Practice
            </h3>
            <p className="mt-3 text-gray-600">
              Access video lessons, assignments and real-world projects.
            </p>
          </div>

          <div className="bg-light p-8 rounded-xl shadow-md">
            <Award className="mx-auto text-primary" size={40} />
            <h3 className="mt-6 font-semibold text-dark text-xl">
              Get Certified
            </h3>
            <p className="mt-3 text-gray-600">
              Earn certificates and boost your professional profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
