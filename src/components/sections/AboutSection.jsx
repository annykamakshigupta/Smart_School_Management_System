import { Card, Timeline } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { FaRegLightbulb, FaRocket } from "react-icons/fa";

const AboutSection = () => {
  const highlights = [
    "Replaces manual and paper-based workflows",
    "Centralized digital solution for all operations",
    "AI-powered predictive analysis",
    "Real-time communication among stakeholders",
    "Secure data handling and management",
    "Intelligent insights for better outcomes",
  ];

  return (
    <section id="about" className="w-full section-padding bg-white">
      <div className="container-wrapper">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">About the Project</h2>
          <p className="section-subtitle">
            A comprehensive solution for modern educational institutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Content */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="icon-box icon-box-lg shrink-0">
                <FaRegLightbulb />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  About the Smart School Management System
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The Smart School Management System (SSMS) is a final year
                  academic project developed to address the challenges faced by
                  educational institutions that rely on manual or fragmented
                  digital systems. The platform integrates academic management,
                  administration, communication, and financial operations into a
                  single, intelligent web-based system.
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-600">
              <p className="text-gray-700 leading-relaxed">
                By leveraging <strong>Artificial Intelligence (AI)</strong>,
                SSMS enables predictive analysis of student performance,
                automated workflows, and real-time communication among all
                stakeholders, helping schools operate efficiently in a modern
                educational environment.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Key Highlights
              </h4>
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircleOutlined className="text-green-600 text-xl mt-0.5 shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="space-y-6">
            <Card className="feature-card">
              <Timeline
                items={[
                  {
                    color: "#4f46e5",
                    children: (
                      <div>
                        <div className="font-semibold text-gray-900">Academic Management</div>
                        <div className="text-sm text-gray-600">Student records, attendance, grading</div>
                      </div>
                    ),
                  },
                  {
                    color: "#4f46e5",
                    children: (
                      <div>
                        <div className="font-semibold text-gray-900">Administrative Operations</div>
                        <div className="text-sm text-gray-600">Staff management, role-based access</div>
                      </div>
                    ),
                  },
                  {
                    color: "#4f46e5",
                    children: (
                      <div>
                        <div className="font-semibold text-gray-900">AI Intelligence</div>
                        <div className="text-sm text-gray-600">Performance prediction, insights</div>
                      </div>
                    ),
                  },
                  {
                    color: "#4f46e5",
                    children: (
                      <div>
                        <div className="font-semibold text-gray-900">Communication Hub</div>
                        <div className="text-sm text-gray-600">Real-time notifications, announcements</div>
                      </div>
                    ),
                  },
                  {
                    color: "#4f46e5",
                    children: (
                      <div>
                        <div className="font-semibold text-gray-900">Financial Management</div>
                        <div className="text-sm text-gray-600">Fee tracking, invoicing, analytics</div>
                      </div>
                    ),
                  },
                ]}
              />
            </Card>

            <div className="glass-card p-6 bg-indigo-600 text-white">
              <div className="flex items-center gap-4">
                <FaRocket className="text-4xl" />
                <div>
                  <div className="text-xl font-bold">Project Vision</div>
                  <div className="text-sm opacity-90">
                    Transforming education through smart technology and AI-driven insights
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
