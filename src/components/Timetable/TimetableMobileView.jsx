import React from "react";
import TimetableCard from "./TimetableCard";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimetableMobileView = ({
  weeklySchedule,
  onScheduleClick,
  showTeacher = true,
  showClass = false,
}) => {
  const [selectedDay, setSelectedDay] = React.useState("Monday");

  const daySchedules = weeklySchedule[selectedDay] || [];
  const sortedSchedules = [...daySchedules].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="space-y-4">
      {/* Day selector */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                selectedDay === day
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}>
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule list */}
      <div className="space-y-3">
        {sortedSchedules.length > 0 ? (
          sortedSchedules.map((schedule) => (
            <div key={schedule._id} className="relative">
              <TimetableCard
                schedule={schedule}
                onClick={() => onScheduleClick && onScheduleClick(schedule)}
                showTeacher={showTeacher}
                showClass={showClass}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No classes scheduled for {selectedDay}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableMobileView;
