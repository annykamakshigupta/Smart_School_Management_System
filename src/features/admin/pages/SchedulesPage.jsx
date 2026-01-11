import React, { useState, useEffect } from "react";
import { PageHeader } from "../../../components/UI";
import {
  TimetableGrid,
  TimetableMobileView,
  ScheduleFormModal,
} from "../../../components/Timetable";
import scheduleService from "../../../services/schedule.service";

const SchedulesPage = () => {
  const [weeklySchedule, setWeeklySchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [successMessage, setSuccessMessage] = useState("");
  const [conflictError, setConflictError] = useState(null);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch schedules
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scheduleService.getSchedules();

      // Organize schedules by day
      const organized = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      };

      response.data.forEach((schedule) => {
        if (organized[schedule.dayOfWeek]) {
          organized[schedule.dayOfWeek].push(schedule);
        }
      });

      setWeeklySchedule(organized);
    } catch (err) {
      setError(err.message || "Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Handle create/update schedule
  const handleSubmitSchedule = async (formData) => {
    try {
      setConflictError(null);

      if (editingSchedule) {
        // Update existing schedule
        await scheduleService.updateSchedule(editingSchedule._id, formData);
        setSuccessMessage("Schedule updated successfully!");
      } else {
        // Create new schedule
        await scheduleService.createSchedule(formData);
        setSuccessMessage("Schedule created successfully!");
      }

      setIsModalOpen(false);
      setEditingSchedule(null);
      fetchSchedules();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      // Check if error has conflicts
      if (err.message.includes("conflict")) {
        setConflictError(err.message);
      } else {
        setError(err.message || "Failed to save schedule");
      }
    }
  };

  // Handle delete schedule
  const handleDeleteSchedule = async (scheduleId) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) {
      return;
    }

    try {
      await scheduleService.deleteSchedule(scheduleId);
      setSuccessMessage("Schedule deleted successfully!");
      fetchSchedules();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete schedule");
    }
  };

  // Handle schedule card click
  const handleScheduleClick = (schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  // Handle add new schedule
  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Schedules"
        subtitle="Create and manage class timetables"
      />

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative">
          <span className="block sm:inline">{successMessage}</span>
          <button
            onClick={() => setSuccessMessage("")}
            className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}

      {/* Conflict Error */}
      {conflictError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg relative">
          <strong className="font-bold">Scheduling Conflict: </strong>
          <span className="block sm:inline">{conflictError}</span>
          <button
            onClick={() => setConflictError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAddSchedule}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Schedule
        </button>
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {isMobile ? (
          <TimetableMobileView
            weeklySchedule={weeklySchedule}
            onScheduleClick={handleScheduleClick}
            showTeacher={true}
            showClass={true}
          />
        ) : (
          <TimetableGrid
            weeklySchedule={weeklySchedule}
            onScheduleClick={handleScheduleClick}
            showTeacher={true}
            showClass={true}
          />
        )}
      </div>

      {/* Schedule Form Modal */}
      <ScheduleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSchedule(null);
          setConflictError(null);
        }}
        onSubmit={handleSubmitSchedule}
        initialData={
          editingSchedule
            ? {
                classId: editingSchedule.classId?._id || "",
                section: editingSchedule.section || "",
                subjectId: editingSchedule.subjectId?._id || "",
                teacherId: editingSchedule.teacherId?._id || "",
                room: editingSchedule.room || "",
                dayOfWeek: editingSchedule.dayOfWeek || "Monday",
                startTime: editingSchedule.startTime || "",
                endTime: editingSchedule.endTime || "",
                academicYear: editingSchedule.academicYear || "",
              }
            : null
        }
        title={editingSchedule ? "Edit Schedule" : "Add New Schedule"}
      />

      {/* Delete Button in Edit Mode */}
      {editingSchedule && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => handleDeleteSchedule(editingSchedule._id)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default SchedulesPage;
