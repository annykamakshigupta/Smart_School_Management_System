import { Row, Col } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  DollarOutlined,
  BarChartOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const ProblemsSection = () => {
  const problems = [
    {
      icon: <FileTextOutlined className="text-3xl" />,
      title: "Paper-Based Records",
      description: "Heavy reliance on paper-based records leading to inefficiency and data loss",
    },
    {
      icon: <ClockCircleOutlined className="text-3xl" />,
      title: "Time-Consuming Processes",
      description: "Manual administrative processes consuming valuable time and resources",
    },
    {
      icon: <MessageOutlined className="text-3xl" />,
      title: "Poor Communication",
      description: "Difficulty in maintaining effective communication between school, parents, and students",
    },
    {
      icon: <BarChartOutlined className="text-3xl" />,
      title: "Performance Tracking",
      description: "Challenges in tracking and analyzing student performance effectively",
    },
    {
      icon: <DollarOutlined className="text-3xl" />,
      title: "Manual Fee Management",
      description: "Error-prone manual fee management leading to delays and discrepancies",
    },
    {
      icon: <WarningOutlined className="text-3xl" />,
      title: "Lack of Data Insights",
      description: "Absence of data-driven decision-making capabilities for better outcomes",
    },
  ];

  return (
    <section className="w-full section-padding bg-gray-50">
      <div className="container-wrapper">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Problems in Traditional School Management</h2>
          <p className="section-subtitle">
            Challenges faced by educational institutions using manual or fragmented systems
          </p>
        </div>

        {/* Problems Grid */}
        <Row gutter={[24, 24]}>
          {problems.map((problem, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div className="glass-card h-full p-6">
                <div className="text-center space-y-4">
                  <div className="icon-box icon-box-lg mx-auto bg-red-500">
                    {problem.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready for a Modern Solution?
            </h3>
            <p className="text-gray-600">
              SSMS addresses all these challenges with an intelligent, integrated platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
