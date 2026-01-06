import { Avatar, Row, Col } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

const UserRolesSection = () => {
  const roles = [
    {
      icon: <UserOutlined className="text-2xl" />,
      title: "Administrators",
      description: "Manage users, reports, finance, and system settings",
      features: [
        "Complete system access",
        "User management",
        "Financial reports",
        "System configuration",
        "Analytics dashboard",
      ],
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      icon: <TeamOutlined className="text-2xl" />,
      title: "Teachers",
      description: "Record attendance, enter marks, monitor performance",
      features: [
        "Attendance management",
        "Grade entry and reporting",
        "Student performance tracking",
        "Assignment management",
        "Parent communication",
      ],
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      icon: <BookOutlined className="text-2xl" />,
      title: "Students",
      description: "View academic progress, attendance, and notifications",
      features: [
        "View grades and progress",
        "Check attendance records",
        "Access assignments",
        "Receive notifications",
        "AI academic assistant",
      ],
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      icon: <UserSwitchOutlined className="text-2xl" />,
      title: "Parents",
      description: "Track student performance, attendance, and fee status",
      features: [
        "Monitor child progress",
        "View attendance records",
        "Fee payment tracking",
        "Receive alerts",
        "Teacher communication",
      ],
      avatar: "https://i.pravatar.cc/150?img=10",
    },
  ];

  return (
    <section id="userroles" className="w-full section-padding bg-gray-50">
      <div className="container-wrapper">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Who Can Use SSMS?</h2>
          <p className="section-subtitle">
            Tailored experiences for every stakeholder in the education ecosystem
          </p>
        </div>

        {/* Roles Grid */}
        <Row gutter={[24, 24]}>
          {roles.map((role, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              <div className="glass-card h-full p-6 text-center">
                <div className="space-y-4">
                  <Avatar
                    size={80}
                    src={role.avatar}
                    className="mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="icon-box mx-auto -mt-6 relative z-10">
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                  <div className="text-left bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</div>
                    <ul className="space-y-1">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-indigo-600 mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="bg-indigo-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Role-Based Access Control</h3>
            <p className="text-lg opacity-90">
              SSMS implements secure role-based access control (RBAC), ensuring
              each user has access only to the features and data relevant to their role.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRolesSection;
