import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-secondary text-textDark mt-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">LearnHub</h2>
          <p className="text-sm leading-6">
            LearnHub is a professional and reliable online learning platform
            providing high-quality courses for skill development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-primary transition">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-primary cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-primary cursor-pointer transition">
              Terms of Service
            </li>
            <li className="hover:text-primary cursor-pointer transition">
              FAQs
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Connect</h3>

          {/* Newsletter */}
          <form className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded border border-primary bg-accent text-textDark focus:outline-none focus:ring-2 focus:ring-primary text-sm w-full"
            />
            <button
              type="submit"
              className="bg-primary hover:opacity-90 text-accent px-4 py-2 rounded text-sm font-semibold transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 text-lg text-primary">
            <a href="#" className="hover:opacity-70 transition">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary text-accent text-center py-4 text-sm">
        © {new Date().getFullYear()} LearnHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
