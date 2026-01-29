/**
 * Admin Attendance Page
 * Modern, clean design for admins to manage all attendance records
 */

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Button,
  message,
  Modal,
  Form,
  Select,
  Input,
  Empty,
  Table,
  Tag,
  DatePicker,
  Spin,
  Progress,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  FilterOutlined,
  CalendarOutlined,
  BarChartOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { PageHeader } from "../../../components/UI";
import {
  getAttendanceByClass,
  updateAttendance,
  deleteAttendance,
  getAttendanceSummary,
} from "../../../services/attendance.service";
import { getAllClasses } from "../../../services/class.service";
import { getAllSubjects } from "../../../services/subject.service";
import dayjs from "dayjs";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

const AdminAttendancePage = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [summary, setSummary] = useState(null);
  const [editModal, setEditModal] = useState({ visible: false, record: null });
  const [form] = Form.useForm();

  // Filters
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dateRange, setDateRange] = useState([
    dayjs().startOf("month"),
    dayjs(),
  ]);

  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [classesRes, subjectsRes] = await Promise.all([
        getAllClasses(),
        getAllSubjects(),
      ]);
      setClasses(classesRes.data || []);
      setSubjects(subjectsRes.data || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      message.error("Failed to load initial data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch attendance
  const fetchAttendance = useCallback(async () => {
    if (!selectedClass) return;

    try {
      setLoading(true);
      const params = {
        classId: selectedClass,
        startDate: dateRange?.[0]?.format("YYYY-MM-DD"),
        endDate: dateRange?.[1]?.format("YYYY-MM-DD"),
      };

      if (selectedSubject) {
        params.subjectId = selectedSubject;
      }

      const [attendanceRes, summaryRes] = await Promise.all([
        getAttendanceByClass(params),
        getAttendanceSummary(params).catch(() => null),
      ]);

      setAttendance(attendanceRes.data || []);
      setSummary(summaryRes?.data || null);
    } catch (error) {
      message.error(error.message || "Error fetching attendance");
    } finally {
      setLoading(false);
    }
  }, [selectedClass, selectedSubject, dateRange]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (selectedClass) {
      fetchAttendance();
    }
  }, [selectedClass, selectedSubject, dateRange, fetchAttendance]);

  // Handle edit
  const handleEdit = (record) => {
    setEditModal({ visible: true, record });
    form.setFieldsValue({
      status: record.status,
      remarks: record.remarks,
    });
  };

  // Handle edit submit
  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateAttendance(editModal.record._id, values);
      message.success("Attendance updated successfully");
      setEditModal({ visible: false, record: null });
      form.resetFields();
      fetchAttendance();
    } catch (error) {
      message.error(error.message || "Error updating attendance");
    }
  };

  // Handle delete
  const handleDelete = (record) => {
    confirm({
      title: "Delete Attendance Record",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: `Are you sure you want to delete this attendance record for ${record.student?.user?.name || "this student"}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteAttendance(record._id);
          message.success("Attendance deleted successfully");
          fetchAttendance();
        } catch (error) {
          message.error(error.message || "Error deleting attendance");
        }
      },
    });
  };

  // Calculate local summary
  const localSummary = {
    total: attendance.length,
    present: attendance.filter((a) => a.status === "present").length,
    absent: attendance.filter((a) => a.status === "absent").length,
    late: attendance.filter((a) => a.status === "late").length,
  };

  const attendanceRate =
    localSummary.total > 0
      ? Math.round((localSummary.present / localSummary.total) * 100)
      : 0;

  // Filter subjects by selected class
  const filteredSubjects = subjects.filter(
    (s) =>
      !selectedClass ||
      s.classId === selectedClass ||
      s.classId?._id === selectedClass,
  );

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 130,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-slate-400" />
          <span>{dayjs(date).format("MMM DD, YYYY")}</span>
        </div>
      ),
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (student) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-medium text-sm">
            {student?.user?.name?.[0]?.toUpperCase() || "S"}
          </div>
          <div>
            <div className="font-medium text-slate-900">
              {student?.user?.name || "Unknown"}
            </div>
            <div className="text-xs text-slate-500">
              Roll: {student?.rollNumber || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (cls) => (
        <span className="text-slate-600">{cls?.name || "N/A"}</span>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (subject) => (
        <div className="flex items-center gap-2">
          <BookOutlined className="text-slate-400" />
          <span>{subject?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      filters: [
        { text: "Present", value: "present" },
        { text: "Absent", value: "absent" },
        { text: "Late", value: "late" },
      ],
      onFilter: (value, record) => record.status === value,
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
          <Tag color={color} icon={icon}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined className="text-blue-500" />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined className="text-red-500" />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (loading && classes.length === 0) {
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
        title="Attendance Management"
        subtitle="Manage all attendance records across the institution"
      />

      {/* Filter Card */}
      <Card className="border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <FilterOutlined className="mr-1" /> Class
            </label>
            <Select
              placeholder="Select Class"
              value={selectedClass}
              onChange={(value) => {
                setSelectedClass(value);
                setSelectedSubject(null);
              }}
              className="w-full"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }>
              {classes.map((cls) => (
                <Select.Option key={cls._id} value={cls._id}>
                  {cls.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <BookOutlined className="mr-1" /> Subject
            </label>
            <Select
              placeholder="All Subjects"
              value={selectedSubject}
              onChange={setSelectedSubject}
              className="w-full"
              disabled={!selectedClass}
              allowClear
              showSearch
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }>
              {filteredSubjects.map((subject) => (
                <Select.Option key={subject._id} value={subject._id}>
                  {subject.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <CalendarOutlined className="mr-1" /> Date Range
            </label>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
              format="MMM DD, YYYY"
            />
          </div>

          <Button
            icon={<ReloadOutlined />}
            onClick={fetchAttendance}
            loading={loading}
            disabled={!selectedClass}>
            Refresh
          </Button>
        </div>
      </Card>

      {/* Summary Cards */}
      {selectedClass && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border border-slate-200 shadow-sm">
            <div className="text-center">
              <TeamOutlined className="text-2xl text-slate-500 mb-2" />
              <div className="text-3xl font-bold text-slate-900">
                {localSummary.total}
              </div>
              <div className="text-sm text-slate-500 mt-1">Total Records</div>
            </div>
          </Card>

          <Card className="border border-emerald-200 bg-emerald-50 shadow-sm">
            <div className="text-center">
              <CheckCircleOutlined className="text-2xl text-emerald-600 mb-2" />
              <div className="text-3xl font-bold text-emerald-700">
                {localSummary.present}
              </div>
              <div className="text-sm text-emerald-600 mt-1">Present</div>
            </div>
          </Card>

          <Card className="border border-red-200 bg-red-50 shadow-sm">
            <div className="text-center">
              <CloseCircleOutlined className="text-2xl text-red-600 mb-2" />
              <div className="text-3xl font-bold text-red-700">
                {localSummary.absent}
              </div>
              <div className="text-sm text-red-600 mt-1">Absent</div>
            </div>
          </Card>

          <Card className="border border-amber-200 bg-amber-50 shadow-sm">
            <div className="text-center">
              <ClockCircleOutlined className="text-2xl text-amber-600 mb-2" />
              <div className="text-3xl font-bold text-amber-700">
                {localSummary.late}
              </div>
              <div className="text-sm text-amber-600 mt-1">Late</div>
            </div>
          </Card>

          <Card className="border border-slate-200 bg-slate-50 shadow-sm">
            <div className="text-center">
              <BarChartOutlined className="text-2xl text-slate-600 mb-2" />
              <Progress
                type="circle"
                percent={attendanceRate}
                width={50}
                strokeColor={
                  attendanceRate >= 75
                    ? "#10b981"
                    : attendanceRate >= 50
                      ? "#f59e0b"
                      : "#ef4444"
                }
                className="mb-1"
              />
              <div className="text-sm text-slate-600 mt-1">Attendance Rate</div>
            </div>
          </Card>
        </div>
      )}

      {/* Attendance Table */}
      <Card
        className="border border-slate-200 shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-slate-600" />
            <span>Attendance Records</span>
          </div>
        }>
        {!selectedClass ? (
          <Empty
            description="Please select a class to view attendance records"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
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
        )}
      </Card>

      {/* Edit Attendance Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EditOutlined className="text-blue-500" />
            <span>Edit Attendance</span>
          </div>
        }
        open={editModal.visible}
        onOk={handleEditSubmit}
        onCancel={() => {
          setEditModal({ visible: false, record: null });
          form.resetFields();
        }}
        okText="Update"
        okButtonProps={{ className: "bg-blue-600" }}>
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}>
            <Select>
              <Select.Option value="present">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-emerald-500" />
                  <span>Present</span>
                </div>
              </Select.Option>
              <Select.Option value="absent">
                <div className="flex items-center gap-2">
                  <CloseCircleOutlined className="text-red-500" />
                  <span>Absent</span>
                </div>
              </Select.Option>
              <Select.Option value="late">
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-amber-500" />
                  <span>Late</span>
                </div>
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="remarks" label="Remarks">
            <Input.TextArea
              rows={3}
              maxLength={500}
              placeholder="Add any remarks or notes..."
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminAttendancePage;
