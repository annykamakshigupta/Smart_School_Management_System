/**
 * My Children Page
 * Parent page to view linked children
 */

import React, { useEffect, useMemo, useState } from "react";
import { Card, Avatar, Tag, Row, Col, Button, Alert, Skeleton } from "antd";
import {
  UserOutlined,
  RightOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PageHeader } from "../../../components/UI";
import { getMyChildren } from "../../../services/parent.service";

const MyChildrenPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortedChildren = useMemo(() => {
    return [...children].sort((a, b) => {
      const aName = a?.userId?.name || a?.name || "";
      const bName = b?.userId?.name || b?.name || "";
      return aName.localeCompare(bName);
    });
  }, [children]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMyChildren();
        setChildren(res.data || []);
      } catch (err) {
        setError(err?.message || "Failed to load children");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div>
      <PageHeader
        title="My Children"
        subtitle="View and manage your children's profiles"
        breadcrumbs={[
          { label: "Parent", path: "/parent/dashboard" },
          { label: "My Children" },
        ]}
      />

      {error && (
        <Alert
          type="error"
          showIcon
          className="mb-4"
          message="Could not load children"
          description={error}
        />
      )}

      <Row gutter={[16, 16]}>
        {loading &&
          Array.from({ length: 2 }).map((_, idx) => (
            <Col xs={24} lg={12} key={`s-${idx}`}>
              <Card>
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            </Col>
          ))}

        {!loading && sortedChildren.length === 0 && !error && (
          <Col span={24}>
            <Card>
              <div className="text-sm text-gray-600">
                No children linked to this parent account yet.
              </div>
            </Card>
          </Col>
        )}

        {!loading &&
          sortedChildren.map((child) => {
            const childId = child?._id;
            const childName = child?.userId?.name || child?.name || "Student";
            const className = child?.classId?.name || "Class";
            const section = child?.section || "-";
            const rollNumber = child?.rollNumber;

            return (
              <Col xs={24} lg={12} key={childId}>
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      className="bg-indigo-100 text-indigo-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {childName}
                          </h2>
                          <p className="text-gray-500">
                            {className} • Section {section}
                            {rollNumber ? ` • Roll ${rollNumber}` : ""}
                          </p>
                        </div>
                        <Tag color="geekblue">Active</Tag>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-8 mb-4 text-sm text-gray-600">
                    <div>
                      <div className="text-xs text-gray-400">Class</div>
                      <div className="font-medium text-gray-800">{className}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Section</div>
                      <div className="font-medium text-gray-800">{section}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Roll</div>
                      <div className="font-medium text-gray-800">
                        {rollNumber || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link to={`/parent/children/${childId}`}>
                      <Button block icon={<RightOutlined />}>
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/parent/child-schedule?child=${childId}`}>
                      <Button
                        block
                        type="primary"
                        icon={<CalendarOutlined />}
                      >
                        View Schedule
                      </Button>
                    </Link>
                    <Link to={`/parent/attendance?child=${childId}`}>
                      <Button block icon={<CheckCircleOutlined />}>
                        Attendance
                      </Button>
                    </Link>
                    <Link to={`/parent/performance/grades?child=${childId}`}>
                      <Button block icon={<BookOutlined />}>
                        Grades
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default MyChildrenPage;
