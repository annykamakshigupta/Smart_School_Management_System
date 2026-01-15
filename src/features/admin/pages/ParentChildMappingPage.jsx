/**
 * Parent Child Mapping Page
 * Admin page for linking parents to students
 */

import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  Tag,
  Space,
  message,
  Avatar,
  Card,
  Tooltip,
  List,
  Empty,
  Row,
  Col,
  Divider,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  UserOutlined,
  ReloadOutlined,
  TeamOutlined,
  LinkOutlined,
  DisconnectOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { PageHeader, DataTable } from "../../../components/UI";
import {
  getAllParents,
  getAllStudents,
  linkChildToParent,
  unlinkChildFromParent,
} from "../../../services/admin.service";

const ParentChildMappingPage = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [parentsRes, studentsRes] = await Promise.all([
        getAllParents(),
        getAllStudents(),
      ]);
      setParents(parentsRes.data || []);
      setStudents(studentsRes.data || []);
    } catch (error) {
      message.error(error.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Get unassigned students (without parent or can be assigned to multiple parents)
  const getAvailableStudents = () => {
    return students.filter((s) => !s.parentId || selectedParent);
  };

  const columns = [
    {
      title: "Parent",
      dataIndex: "userId",
      key: "parent",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            icon={<TeamOutlined />}
            className="bg-purple-100 text-purple-600"
          />
          <div>
            <div className="font-medium">{user?.name || "N/A"}</div>
            <div className="text-xs text-gray-500">{user?.email || "N/A"}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "userId",
      key: "phone",
      render: (user) => user?.phone || "N/A",
    },
    {
      title: "Children",
      dataIndex: "children",
      key: "children",
      render: (children) => (
        <div className="flex flex-wrap gap-1">
          {children && children.length > 0 ? (
            children.map((child, index) => (
              <Tag key={index} color="green">
                {child?.userId?.name || "Unknown"} (
                {child?.classId?.name || "N/A"})
              </Tag>
            ))
          ) : (
            <Tag color="default">No children assigned</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="Link Child">
            <Button
              type="primary"
              size="small"
              icon={<LinkOutlined />}
              onClick={() => handleOpenLinkModal(record)}>
              Link
            </Button>
          </Tooltip>
          <Tooltip title="View Details">
            <Button size="small" onClick={() => handleViewDetails(record)}>
              View
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleOpenLinkModal = (parent) => {
    setSelectedParent(parent);
    form.resetFields();
    setIsLinkModalOpen(true);
  };

  const handleViewDetails = (parent) => {
    Modal.info({
      title: `Children of ${parent.userId?.name}`,
      width: 600,
      content: (
        <div className="mt-4">
          {parent.children && parent.children.length > 0 ? (
            <List
              dataSource={parent.children}
              renderItem={(child) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      key="unlink"
                      title="Unlink this child?"
                      onConfirm={() =>
                        handleUnlinkChild(parent.userId._id, child._id)
                      }>
                      <Button size="small" danger icon={<DisconnectOutlined />}>
                        Unlink
                      </Button>
                    </Popconfirm>,
                  ]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<UserOutlined />}
                        className="bg-green-100"
                      />
                    }
                    title={child?.userId?.name || "Unknown"}
                    description={
                      <div>
                        <div>
                          Class: {child?.classId?.name || "N/A"} -{" "}
                          {child?.section}
                        </div>
                        <div>Roll: {child?.rollNumber}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No children linked to this parent" />
          )}
        </div>
      ),
    });
  };

  const handleLinkChild = async (values) => {
    try {
      await linkChildToParent(selectedParent.userId._id, values.studentId);
      message.success("Child linked to parent successfully");
      setIsLinkModalOpen(false);
      setSelectedParent(null);
      form.resetFields();
      fetchData();
    } catch (error) {
      message.error(error.message || "Error linking child");
    }
  };

  const handleUnlinkChild = async (parentId, studentId) => {
    try {
      await unlinkChildFromParent(parentId, studentId);
      message.success("Child unlinked from parent successfully");
      fetchData();
    } catch (error) {
      message.error(error.message || "Error unlinking child");
    }
  };

  // Stats
  const parentsWithChildren = parents.filter(
    (p) => p.children && p.children.length > 0
  ).length;
  const parentsWithoutChildren = parents.length - parentsWithChildren;
  const studentsWithParent = students.filter((s) => s.parentId).length;
  const studentsWithoutParent = students.length - studentsWithParent;

  return (
    <div>
      <PageHeader
        title="Parent-Child Mapping"
        subtitle="Link parents to their children for attendance and academic tracking"
        breadcrumbs={[
          { label: "Admin", path: "/admin/dashboard" },
          { label: "User Management", path: "/admin/users" },
          { label: "Parent-Child Mapping" },
        ]}
        actions={
          <Button icon={<ReloadOutlined />} onClick={fetchData}>
            Refresh
          </Button>
        }
      />

      {/* Stats */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} md={6}>
          <Card size="small">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TeamOutlined className="text-purple-600 text-lg" />
              </div>
              <div>
                <div className="text-2xl font-bold">{parents.length}</div>
                <div className="text-xs text-gray-500">Total Parents</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card size="small">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <LinkOutlined className="text-green-600 text-lg" />
              </div>
              <div>
                <div className="text-2xl font-bold">{parentsWithChildren}</div>
                <div className="text-xs text-gray-500">With Children</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card size="small">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DisconnectOutlined className="text-yellow-600 text-lg" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {parentsWithoutChildren}
                </div>
                <div className="text-xs text-gray-500">Without Children</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card size="small">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <UserOutlined className="text-red-600 text-lg" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {studentsWithoutParent}
                </div>
                <div className="text-xs text-gray-500">Students No Parent</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Parents Table */}
        <Col xs={24} lg={16}>
          <Card title="Parents List">
            <DataTable
              columns={columns}
              data={parents}
              loading={loading}
              showSearch
              searchPlaceholder="Search parents..."
              rowKey={(record) => record.userId?._id || record._id}
            />
          </Card>
        </Col>

        {/* Students without Parent */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <span>
                <UserOutlined className="mr-2" />
                Students Without Parent
              </span>
            }
            extra={<Tag color="red">{studentsWithoutParent}</Tag>}>
            {students.filter((s) => !s.parentId).length > 0 ? (
              <List
                size="small"
                dataSource={students.filter((s) => !s.parentId).slice(0, 10)}
                renderItem={(student) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size="small"
                          icon={<UserOutlined />}
                          className="bg-green-100"
                        />
                      }
                      title={
                        <span className="text-sm">
                          {student.userId?.name || "Unknown"}
                        </span>
                      }
                      description={
                        <span className="text-xs text-gray-500">
                          {student.classId?.name} - {student.section} | Roll:{" "}
                          {student.rollNumber}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                description="All students have parents assigned"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
            {studentsWithoutParent > 10 && (
              <div className="text-center mt-2 text-gray-500 text-sm">
                And {studentsWithoutParent - 10} more...
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Link Child Modal */}
      <Modal
        title={`Link Child to ${selectedParent?.userId?.name}`}
        open={isLinkModalOpen}
        onCancel={() => {
          setIsLinkModalOpen(false);
          setSelectedParent(null);
          form.resetFields();
        }}
        footer={null}
        width={500}>
        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar icon={<TeamOutlined />} className="bg-purple-100" />
            <div>
              <div className="font-medium">{selectedParent?.userId?.name}</div>
              <div className="text-xs text-gray-500">
                <MailOutlined className="mr-1" />
                {selectedParent?.userId?.email}
              </div>
              <div className="text-xs text-gray-500">
                <PhoneOutlined className="mr-1" />
                {selectedParent?.userId?.phone}
              </div>
            </div>
          </div>
        </div>

        <Divider>Select Student to Link</Divider>

        <Form form={form} layout="vertical" onFinish={handleLinkChild}>
          <Form.Item
            name="studentId"
            label="Select Student"
            rules={[{ required: true, message: "Please select a student" }]}>
            <Select
              placeholder="Search and select student"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {students
                .filter(
                  (s) => !selectedParent?.children?.find((c) => c._id === s._id)
                )
                .map((student) => (
                  <Select.Option key={student._id} value={student._id}>
                    {student.userId?.name} ({student.classId?.name} -{" "}
                    {student.section}, Roll: {student.rollNumber})
                    {student.parentId && " [Has Parent]"}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsLinkModalOpen(false);
                  setSelectedParent(null);
                  form.resetFields();
                }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<LinkOutlined />}>
                Link Child
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParentChildMappingPage;
