import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";
import { message } from "antd";
import {
  PageHeader,
  StatCard,
  EmptyState,
  LoadingScreen,
} from "../../../components/UI";
import {
  AssignmentCard,
  CreateAssignmentModal,
} from "../../../components/Assignment";
import * as assignmentService from "../../../services/assignment.service";
import * as classService from "../../../services/class.service";
import * as subjectService from "../../../services/subject.service";

const TeacherAssignmentsPage = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    class: "",
    subject: "",
    search: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchAssignments();
    }
  }, [filters]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [assignmentsRes, classesRes, subjectsRes, analyticsRes] =
        await Promise.all([
          assignmentService.getTeacherAssignments(),
          classService.getAllClasses(),
          subjectService.getAllSubjects(),
          assignmentService.getAssignmentAnalytics(),
        ]);

      setAssignments(assignmentsRes.data || []);
      setClasses(classesRes.data || []);
      setSubjects(subjectsRes.data || []);
      setAnalytics(analyticsRes.data || null);
    } catch (error) {
      message.error(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await assignmentService.getTeacherAssignments(filters);
      setAssignments(response.data || []);
    } catch (error) {
      message.error(error.message || "Failed to load assignments");
    }
  };

  const handleCreateAssignment = async (assignmentData) => {
    try {
      await assignmentService.createAssignment(assignmentData);
      message.success("Assignment created successfully!");
      setIsModalOpen(false);
      fetchAssignments();
      if (analytics) {
        const analyticsRes = await assignmentService.getAssignmentAnalytics();
        setAnalytics(analyticsRes.data);
      }
    } catch (error) {
      message.error(error.message || "Failed to create assignment");
    }
  };

  const handleAssignmentClick = (assignment) => {
    navigate(`/teacher/assignments/${assignment._id}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Assignment Management"
        description="Create, manage, and grade student assignments"
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg">
            <Plus size={20} />
            Create Assignment
          </button>
        }
      />

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assignments"
            value={analytics.totalAssignments}
            icon={FileText}
            color="blue"
            trend={`${analytics.publishedAssignments} published`}
          />
          <StatCard
            title="Total Submissions"
            value={analytics.totalSubmissions}
            icon={Award}
            color="green"
          />
          <StatCard
            title="Pending Grading"
            value={analytics.pendingGrading}
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Average Score"
            value={`${analytics.averageMarksPercentage}%`}
            icon={TrendingUp}
            color="purple"
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search assignments..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="expired">Expired</option>
          </select>

          {/* Class Filter */}
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange("class", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>

          {/* Subject Filter */}
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments Grid */}
      {assignments.length === 0 ? (
        <EmptyState
          title="No assignments found"
          description="Create your first assignment to get started"
          action={{
            label: "Create Assignment",
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onClick={() => handleAssignmentClick(assignment)}
              viewMode="teacher"
            />
          ))}
        </div>
      )}

      {/* Create Assignment Modal */}
      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssignment}
        classes={classes}
        subjects={subjects}
      />
    </div>
  );
};

export default TeacherAssignmentsPage;
