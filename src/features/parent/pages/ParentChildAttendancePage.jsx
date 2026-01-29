/**
 * Parent Child Attendance Page
 * Modern, clean design for parents to view their children's attendance records
 */

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  message,
  DatePicker,
  Select,
  Empty,
  Table,
  Tag,
  Spin,
  Progress,
  Avatar,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { PageHeader } from "../../../components/UI";
import {
  getAttendanceForChild,
  getCurrentMonthRange,
} from "../../../services/attendance.service";
import { getAllSubjects } from "../../../services/subject.service";
import { getMyChildren } from "../../../services/parent.service";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

const { RangePicker } = DatePicker;

const ParentChildAttendancePage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dateRange, setDateRange] = useState(() => {
    const range = getCurrentMonthRange();
    return [dayjs(range.startDate), dayjs(range.endDate)];
  });

  // Fetch children
  const fetchChildren = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMyChildren();
      const list = response.data || [];
      setChildren(list);

      const preselected = searchParams.get("child");
      const hasPreselected =
        preselected && list.some((c) => c._id === preselected);
      if (hasPreselected) {
        setSelectedChild(preselected);
      } else if (list.length > 0) {
        setSelectedChild(list[0]._id);
      }
    } catch (error) {
      message.error("Error fetching children");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Fetch subjects
  const fetchSubjects = useCallback(async () => {
    try {
      const response = await getAllSubjects();
      setSubjects(response.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  // Fetch attendance
  const fetchAttendance = useCallback(async () => {
    if (!selectedChild) return;

    try {
      setLoading(true);
      const params = {
        childId: selectedChild,
        startDate: dateRange?.[0]?.format("YYYY-MM-DD"),
        endDate: dateRange?.[1]?.format("YYYY-MM-DD"),
      };

      if (selectedSubject) {
        params.subjectId = selectedSubject;
      }

      const response = await getAttendanceForChild(params);
      setAttendance(response.data || []);
    } catch (error) {
      message.error(error.message || "Error fetching attendance");
    } finally {
      setLoading(false);
    }
  }, [selectedChild, selectedSubject, dateRange]);

  useEffect(() => {
    fetchChildren();
    fetchSubjects();
  }, [fetchChildren, fetchSubjects]);

  useEffect(() => {
    if (selectedChild) {
      fetchAttendance();
    }
  }, [selectedChild, fetchAttendance]);

  // Calculate statistics
  const stats = {
    total: attendance.length,
    present: attendance.filter((a) => a.status === "present").length,
    absent: attendance.filter((a) => a.status === "absent").length,
    late: attendance.filter((a) => a.status === "late").length,
  };

  const attendanceRate =
    stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  // Get selected child info
  const selectedChildInfo = children.find(
    (child) => child._id === selectedChild,
  );

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 130,
      render: (date) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-slate-400" />
          <span>{dayjs(date).format("MMM DD, YYYY")}</span>
        </div>
      ),
    },
    {
      title: "Day",
      dataIndex: "date",
      key: "day",
      width: 100,
      render: (date) => (
        <span className="text-slate-500">{dayjs(date).format("dddd")}</span>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (subject) => (
        <div className="flex items-center gap-2">
          <BookOutlined className="text-violet-500" />
          <span className="font-medium">{subject?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const config = {
          present: {
            color: "success",
            icon: <CheckCircleOutlined />,
            label: "Present",
          },
          absent: {
            color: "error",
            icon: <CloseCircleOutlined />,
            label: "Absent",
          },
          late: {
            color: "warning",
            icon: <ClockCircleOutlined />,
            label: "Late",
          },
        };
        const { color, icon, label } = config[status] || config.present;
        return (
          <Tag color={color} icon={icon} className="px-3 py-1">
            {label}
          </Tag>
        );
      },
    },
  ];

  if (loading && children.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Child's Attendance"
        subtitle="Monitor your child's attendance records and performance"
      />

      {/* Child Selector */}
      <Card className="border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <UserOutlined className="mr-1" /> Select Child
            </label>
            <Select
              placeholder="Select a child"
              value={selectedChild}
              onChange={setSelectedChild}
              className="w-full"
              size="large">
              {children.map((child) => (
                <Select.Option key={child._id} value={child._id}>
                  {child.userId?.name ||
                    child.user?.name ||
                    child.name ||
                    "Student"}
                </Select.Option>
              ))}
            </Select>
          </div>

          {selectedChildInfo && (
            <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl">
              <Avatar
                size={48}
                icon={<UserOutlined />}
                className="bg-violet-600">
                {(selectedChildInfo.userId?.name ||
                  selectedChildInfo.user?.name)?.[0]?.toUpperCase()}
              </Avatar>
              <div>
                <div className="font-semibold text-slate-900">
                  {selectedChildInfo.userId?.name ||
                    selectedChildInfo.user?.name ||
                    "Student"}
                </div>
                <div className="text-sm text-slate-500">
                  Class: {selectedChildInfo.class?.name || "N/A"}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {selectedChild ? (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <div className="text-center">
                <CalendarOutlined className="text-2xl text-slate-500 mb-2" />
                <div className="text-3xl font-bold text-slate-900">
                  {stats.total}
                </div>
                <div className="text-sm text-slate-500 mt-1">Total Days</div>
              </div>
            </Card>

            <Card className="border border-emerald-200 bg-emerald-50 shadow-sm">
              <div className="text-center">
                <CheckCircleOutlined className="text-2xl text-emerald-600 mb-2" />
                <div className="text-3xl font-bold text-emerald-700">
                  {stats.present}
                </div>
                <div className="text-sm text-emerald-600 mt-1">Present</div>
              </div>
            </Card>

            <Card className="border border-red-200 bg-red-50 shadow-sm">
              <div className="text-center">
                <CloseCircleOutlined className="text-2xl text-red-600 mb-2" />
                <div className="text-3xl font-bold text-red-700">
                  {stats.absent}
                </div>
                <div className="text-sm text-red-600 mt-1">Absent</div>
              </div>
            </Card>

            <Card className="border border-amber-200 bg-amber-50 shadow-sm">
              <div className="text-center">
                <ClockCircleOutlined className="text-2xl text-amber-600 mb-2" />
                <div className="text-3xl font-bold text-amber-700">
                  {stats.late}
                </div>
                <div className="text-sm text-amber-600 mt-1">Late</div>
              </div>
            </Card>

            <Card className="border border-violet-200 bg-violet-50 shadow-sm">
              <div className="text-center">
                <BarChartOutlined className="text-2xl text-violet-600 mb-2" />
                <Progress
                  type="circle"
                  percent={attendanceRate}
                  width={50}
                  strokeColor={
                    attendanceRate >= 75
                      ? "#8b5cf6"
                      : attendanceRate >= 50
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  className="mb-1"
                />
                <div className="text-sm text-violet-600 mt-1">Attendance %</div>
              </div>
            </Card>
          </div>

          {/* Attendance Alerts */}
          {stats.total > 0 && attendanceRate < 75 && (
            <Card className="border border-amber-300 bg-amber-50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <ExclamationCircleOutlined className="text-amber-600 text-2xl" />
                </div>
                <div>
                  <div className="font-semibold text-amber-800">
                    Low Attendance Alert
                  </div>
                  <div className="text-sm text-amber-700">
                    Your child's attendance is{" "}
                    <strong>{attendanceRate}%</strong>, which is below the
                    recommended 75%. Please ensure regular school attendance for
                    better academic performance.
                  </div>
                </div>
              </div>
            </Card>
          )}

          {stats.total > 0 && attendanceRate >= 95 && (
            <Card className="border border-emerald-300 bg-emerald-50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <StarOutlined className="text-emerald-600 text-2xl" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-800">
                    Excellent Attendance!
                  </div>
                  <div className="text-sm text-emerald-700">
                    Your child maintains an outstanding attendance rate of{" "}
                    <strong>{attendanceRate}%</strong>. Keep up the great work!
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Filters */}
          <Card className="border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <CalendarOutlined className="mr-1" /> Date Range
                </label>
                <RangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  format="MMM DD, YYYY"
                  className="w-full"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <BookOutlined className="mr-1" /> Subject
                </label>
                <Select
                  placeholder="All Subjects"
                  value={selectedSubject}
                  onChange={setSelectedSubject}
                  allowClear
                  className="w-full"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }>
                  {subjects.map((subject) => (
                    <Select.Option key={subject._id} value={subject._id}>
                      {subject.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </Card>

          {/* Attendance Table */}
          <Card
            className="border border-slate-200 shadow-sm"
            title={
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-violet-600" />
                <span>Attendance Records</span>
              </div>
            }>
            <Table
              columns={columns}
              dataSource={attendance}
              rowKey="_id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} records`,
              }}
              locale={{
                emptyText: (
                  <Empty
                    description="No attendance records found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ),
              }}
            />
          </Card>
        </>
      ) : (
        <Card className="border border-slate-200 shadow-sm">
          <Empty
            description="Please select a child to view attendance records"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      )}
    </div>
  );
};

export default ParentChildAttendancePage;
