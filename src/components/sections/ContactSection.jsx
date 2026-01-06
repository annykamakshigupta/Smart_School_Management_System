import { Form, Input, Button, Card, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const ContactSection = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Contact form values:", values);
    message.success(
      "Thank you for your interest! We will get back to you soon."
    );
    form.resetFields();
  };

  const contactInfo = [
    {
      icon: <EnvironmentOutlined className="text-3xl text-purple-600" />,
      title: "Project Type",
      content: "Final Year Academic Project",
    },
    {
      icon: <MailOutlined className="text-3xl text-purple-600" />,
      title: "Purpose",
      content: "Educational Use Only",
    },
    {
      icon: <PhoneOutlined className="text-3xl text-purple-600" />,
      title: "Methodology",
      content: "Agile Scrum Development",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full py-16 sm:py-20 lg:py-24 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about SSMS? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border border-purple-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                  label={<span className="font-semibold">Full Name</span>}
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}>
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label={<span className="font-semibold">Email Address</span>}
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}>
                  <Input size="large" placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  label={<span className="font-semibold">Subject</span>}
                  name="subject"
                  rules={[{ required: true, message: "Please enter subject" }]}>
                  <Input size="large" placeholder="Inquiry about SSMS" />
                </Form.Item>

                <Form.Item
                  label={<span className="font-semibold">Message</span>}
                  name="message"
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}>
                  <TextArea
                    rows={4}
                    placeholder="Tell us about your inquiry..."
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    className="h-12 text-lg font-semibold">
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Project Information
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                SSMS is an academic project developed to showcase modern web
                development, AI integration, and education technology solutions.
                For more information about the project or to provide feedback,
                please reach out.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="hover-card-effect border-2 border-gray-100">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0">{info.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg mb-1">
                        {info.title}
                      </div>
                      <div className="text-gray-600">{info.content}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Project Stats */}
            <Card className="bg-linear-to-r from-purple-600 to-indigo-600 text-white border-0">
              <h4 className="font-bold text-xl mb-4">Project Highlights</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold mb-1">AI</div>
                  <div className="text-sm opacity-90">Powered Intelligence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">Web</div>
                  <div className="text-sm opacity-90">Based Platform</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">Secure</div>
                  <div className="text-sm opacity-90">RBAC System</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">Modern</div>
                  <div className="text-sm opacity-90">Tech Stack</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
