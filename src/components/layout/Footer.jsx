import { Link } from "react-router-dom";
import { FaGraduationCap, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail, MdSchool, MdCode } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-wrapper py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <FaGraduationCap className="text-xl text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">SSMS</div>
                <div className="text-xs">Smart School System</div>
              </div>
            </div>
            <p className="mb-4 text-sm">
              AI-Powered School Administration & Academic Automation Platform
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About Project
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#userroles" className="hover:text-indigo-400 transition-colors">
                  User Roles
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-indigo-400 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* User Roles */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">User Roles</h3>
            <ul className="space-y-2">
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Administrators
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Teachers
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Students
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Parents
              </li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Project Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MdSchool className="text-indigo-400 mt-1 shrink-0" size={18} />
                <span className="text-sm">Final Year Academic Project</span>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-indigo-400 shrink-0" size={18} />
                <span className="text-sm">Educational Use Only</span>
              </li>
              <li className="flex items-center gap-3">
                <MdCode className="text-indigo-400 shrink-0" size={18} />
                <span className="text-sm">Agile Scrum Methodology</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © {currentYear} Smart School Management System (SSMS) - All rights reserved
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="hover:text-indigo-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-indigo-400 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
