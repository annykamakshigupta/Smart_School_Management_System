import { Steps, Tag } from "antd";
import {
  LoginOutlined,
  SafetyOutlined,
  DashboardOutlined,
  ToolOutlined,
  RobotOutlined,
  BellOutlined,
} from "@ant-design/icons";

const WorkflowSection = () => {
  const steps = [
    {
      title: "User Login",
      description: "User logs into the system with secure credentials",
      icon: <LoginOutlined className="text-xl" />,
    },
    {
      title: "Authentication",
      description: "Role-based authentication is applied",
      icon: <SafetyOutlined className="text-xl" />,
    },
    {
      title: "Dashboard Loading",
      description: "Dashboard is loaded according to user role",
      icon: <DashboardOutlined className="text-xl" />,
    },
    {
      title: "Operations",
      description: "Academic, administrative, or financial operations are performed",
      icon: <ToolOutlined className="text-xl" />,
    },
    {
      title: "AI Analysis",
      description: "AI module analyzes data and generates insights",
      icon: <RobotOutlined className="text-xl" />,
    },
    {
      title: "Notifications",
      description: "Reports and notifications are sent in real time",
      icon: <BellOutlined className="text-xl" />,
    },
  ];

  return (
    <section id="workflow" className="w-full section-padding bg-white">
      <div className="container-wrapper">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">How the System Works</h2>
          <p className="section-subtitle">
            A streamlined workflow designed for efficiency and user experience
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Steps
            current={-1}
            items={steps.map((step) => ({
              title: <span className="font-semibold">{step.title}</span>,
              description: step.description,
              icon: (
                <div className="icon-box">
                  {step.icon}
                </div>
              ),
            }))}
          />
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-start gap-4">
                <Tag color="blue" className="text-base px-3 py-1 shrink-0">
                  {index + 1}
                </Tag>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="icon-box w-10 h-10 text-base">{step.icon}</div>
                    <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Visualization */}
        <div className="mt-12">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Seamless Integration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-4xl mb-3">🔐</div>
                <div className="font-semibold text-gray-900 mb-2">Secure Access</div>
                <div className="text-sm text-gray-600">
                  Multi-layer security with role-based permissions
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-4xl mb-3">⚡</div>
                <div className="font-semibold text-gray-900 mb-2">Real-Time Processing</div>
                <div className="text-sm text-gray-600">Instant data processing and updates</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-4xl mb-3">🤖</div>
                <div className="font-semibold text-gray-900 mb-2">AI-Driven Insights</div>
                <div className="text-sm text-gray-600">Intelligent analytics and predictions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
