import { Row, Col } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  BookOutlined,
  RobotOutlined,
  BellOutlined,
  SafetyOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const FeaturesSection = () => {
  const features = [
    {
      icon: <UserOutlined />,
      title: "Administrative Management",
      items: [
        "Student and staff record management",
        "Role-Based Access Control (RBAC)",
        "Secure authentication and authorization",
      ],
    },
    {
      icon: <BookOutlined />,
      title: "Academic Management",
      items: [
        "Attendance tracking system",
        "Assignment and grading management",
        "Timetable and course management",
      ],
    },
    {
      icon: <RobotOutlined />,
      title: "AI-Powered Intelligence",
      items: [
        "Student performance prediction",
        "Early identification of at-risk students",
        "AI academic assistant (chatbot support)",
      ],
    },
    {
      icon: <BellOutlined />,
      title: "Communication & Notifications",
      items: [
        "Real-time announcements",
        "Parent-teacher communication",
        "Automated alerts and reminders",
      ],
    },
    {
      icon: <DollarOutlined />,
      title: "Financial Management",
      items: [
        "Fee structure and invoice generation",
        "Payment tracking and reminders",
        "Financial analytics dashboard",
      ],
    },
    {
      icon: <SafetyOutlined />,
      title: "Security & Compliance",
      items: [
        "Role-based access control",
        "Encrypted data storage",
        "Audit logs and compliance tracking",
      ],
    },
  ];

  return (
    <section id="features" className="w-full section-padding bg-white">
      <div className="container-wrapper">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Key Features of SSMS</h2>
          <p className="section-subtitle">
            Comprehensive features designed to streamline every aspect of school management
          </p>
        </div>

        {/* Features Grid */}
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div className="feature-card h-full">
                <div className="space-y-4">
                  <div className="icon-box">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-indigo-600 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Bottom Highlight */}
        <div className="mt-12 bg-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">All-in-One Platform</h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              SSMS integrates all essential school management features into a single,
              user-friendly platform, ensuring seamless operations and improved efficiency.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <BarChartOutlined className="text-4xl mb-2" />
                <div className="text-sm font-semibold">Analytics</div>
              </div>
              <div className="text-center">
                <TeamOutlined className="text-4xl mb-2" />
                <div className="text-sm font-semibold">Multi-User</div>
              </div>
              <div className="text-center">
                <CalendarOutlined className="text-4xl mb-2" />
                <div className="text-sm font-semibold">Scheduling</div>
              </div>
              <div className="text-center">
                <RobotOutlined className="text-4xl mb-2" />
                <div className="text-sm font-semibold">AI-Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
