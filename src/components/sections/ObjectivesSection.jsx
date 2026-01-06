import { Card, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const ObjectivesSection = () => {
  const objectives = [
    {
      title: "Automate Academic and Administrative Processes",
      description:
        "Streamline daily operations by automating attendance, grading, scheduling, and administrative tasks",
      icon: "🤖",
    },
    {
      title: "Improve Transparency and Efficiency",
      description:
        "Provide clear visibility into all school operations with real-time updates and comprehensive reporting",
      icon: "📊",
    },
    {
      title: "Integrate AI for Performance Prediction",
      description:
        "Leverage artificial intelligence to predict student performance and identify at-risk students early",
      icon: "🧠",
    },
    {
      title: "Enhance Stakeholder Communication",
      description:
        "Facilitate seamless communication between administrators, teachers, students, and parents",
      icon: "💬",
    },
    {
      title: "Provide Secure and Scalable Platform",
      description:
        "Deliver a secure, reliable, and scalable digital platform that grows with your institution",
      icon: "🔐",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-linear-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md mb-6">
            <span className="text-lg sm:text-xl font-bold linear-text">
              Project Objectives
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Mission & <span className="linear-text">Goals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear objectives driving the development of SSMS
          </p>
        </div>

        {/* Objectives List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {objectives.map((objective, index) => (
            <Card
              key={index}
              className="hover-card-effect border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0 text-4xl sm:text-5xl">
                      {objective.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {objective.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </div>
                <CheckCircleOutlined className="text-2xl sm:text-3xl text-green-600 shrink-0" />
              </div>
            </Card>
          ))}
        </div>

        {/* Project Scope */}
        <div className="mt-12 sm:mt-16">
          <Card className="bg-white border border-purple-200 max-w-5xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Project Scope & Target Users
            </h3>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-purple-600 mb-3">
                    Focus Areas
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "AI & Machine Learning",
                      "Web Development",
                      "Education Technology",
                      "Data Analytics",
                      "Cloud Computing",
                    ].map((area, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-700">
                        <span className="text-purple-600 text-xl">✓</span>
                        <span className="font-medium">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-indigo-600 mb-3">
                    Target Users
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Schools & Educational Institutions",
                      "Teachers & Academic Staff",
                      "Students & Learners",
                      "Parents & Guardians",
                      "Administrative Personnel",
                    ].map((user, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-700">
                        <span className="text-indigo-600 text-xl">✓</span>
                        <span className="font-medium">{user}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Development Methodology */}
        <div className="mt-12">
          <Card className="bg-linear-to-r from-purple-600 to-indigo-600 text-white text-center border-0 max-w-4xl mx-auto">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-3xl font-bold mb-3">Agile Scrum Methodology</h3>
            <p className="text-lg opacity-90">
              Developed using Agile Scrum principles for iterative development,
              continuous improvement, and rapid delivery of features
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
