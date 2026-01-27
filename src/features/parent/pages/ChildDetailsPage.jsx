/**
 * ChildDetailsPage
 * Parent view of a single child profile with quick links.
 */

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  Avatar,
  Descriptions,
  Row,
  Col,
  Button,
  Alert,
  Skeleton,
  Tag,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  BookOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { PageHeader } from "../../../components/UI";
import { getMyChildren } from "../../../services/parent.service";

const ChildDetailsPage = () => {
  const { id } = useParams();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMyChildren();
        setChildren(res.data || []);
      } catch (err) {
        setError(err?.message || "Failed to load child details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const child = useMemo(() => {
    return children.find((c) => c?._id === id) || null;
  }, [children, id]);

  const childName = child?.userId?.name || child?.name || "Student";
  const className = child?.classId?.name || "Class";
  const section = child?.section || "-";
  const rollNumber = child?.rollNumber;
  const email = child?.userId?.email;
  const phone = child?.userId?.phone;

  return (
    <div>
      <PageHeader
        title="Child Details"
        subtitle="Profile overview and quick actions"
        breadcrumbs={[
          { label: "Parent", path: "/parent/dashboard" },
          { label: "My Children", path: "/parent/children" },
          { label: childName },
        ]}
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <Link to="/parent/children">
          <Button icon={<ArrowLeftOutlined />}>Back to Children</Button>
        </Link>
        <Link to={`/parent/child-schedule?child=${id}`}>
          <Button type="primary" icon={<CalendarOutlined />}>
            View Schedule
          </Button>
        </Link>
        <Link to={`/parent/attendance?child=${id}`}>
          <Button icon={<CheckCircleOutlined />}>Attendance</Button>
        </Link>
        <Link to={`/parent/performance/grades?child=${id}`}>
          <Button icon={<BookOutlined />}>Grades</Button>
        </Link>
      </div>

      {error && (
        <Alert
          type="error"
          showIcon
          className="mb-4"
          message="Could not load child"
          description={error}
        />
      )}

      {loading && (
        <Card>
          <Skeleton active avatar paragraph={{ rows: 6 }} />
        </Card>
      )}

      {!loading && !error && !child && (
        <Alert
          type="warning"
          showIcon
          message="Child not found"
          description="This child is not linked to your account (or the link is invalid)."
        />
      )}

      {!loading && !error && child && (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Card>
              <div className="flex items-start gap-4">
                <Avatar
                  size={72}
                  icon={<UserOutlined />}
                  className="bg-indigo-100 text-indigo-600"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {childName}
                      </div>
                      <div className="text-gray-500">
                        {className} • Section {section}
                        {rollNumber ? ` • Roll ${rollNumber}` : ""}
                      </div>
                    </div>
                    <Tag color="geekblue">Active</Tag>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={14}>
            <Card title="Profile">
              <Descriptions column={1} size="middle">
                <Descriptions.Item label="Name">{childName}</Descriptions.Item>
                <Descriptions.Item label="Class">{className}</Descriptions.Item>
                <Descriptions.Item label="Section">{section}</Descriptions.Item>
                <Descriptions.Item label="Roll Number">
                  {rollNumber || "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {email || "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {phone || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ChildDetailsPage;
