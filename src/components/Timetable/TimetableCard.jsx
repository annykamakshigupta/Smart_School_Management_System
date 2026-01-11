import React from "react";

const SUBJECT_COLORS = [
  "bg-blue-100 border-blue-300 text-blue-800",
  "bg-green-100 border-green-300 text-green-800",
  "bg-purple-100 border-purple-300 text-purple-800",
  "bg-orange-100 border-orange-300 text-orange-800",
  "bg-pink-100 border-pink-300 text-pink-800",
  "bg-indigo-100 border-indigo-300 text-indigo-800",
  "bg-yellow-100 border-yellow-300 text-yellow-800",
  "bg-teal-100 border-teal-300 text-teal-800",
];

const getSubjectColor = (subjectId) => {
  const hash = subjectId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return SUBJECT_COLORS[hash % SUBJECT_COLORS.length];
};

const TimetableCard = ({
  schedule,
  onClick,
  showTeacher = true,
  showClass = false,
}) => {
  const colorClass = schedule?.subjectId?._id
    ? getSubjectColor(schedule.subjectId._id)
    : SUBJECT_COLORS[0];

  return (
    <div
      onClick={onClick}
      className={`${colorClass} border-l-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group`}>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-sm line-clamp-1">
            {schedule?.subjectId?.name || "Unknown Subject"}
          </h4>
          <span className="text-xs opacity-75">
            {schedule?.startTime} - {schedule?.endTime}
          </span>
        </div>

        {showTeacher && schedule?.teacherId && (
          <p className="text-xs opacity-80">
            {schedule.teacherId.firstName} {schedule.teacherId.lastName}
          </p>
        )}

        {showClass && schedule?.classId && (
          <p className="text-xs opacity-80">
            {schedule.classId.name} - {schedule.section}
          </p>
        )}

        <p className="text-xs opacity-75">Room: {schedule?.room}</p>
      </div>

      {/* Hover tooltip */}
      <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-lg p-3 border border-gray-200 mt-2 min-w-50">
        <p className="text-sm font-semibold mb-1">
          {schedule?.subjectId?.name}
        </p>
        {showTeacher && schedule?.teacherId && (
          <p className="text-xs text-gray-600">
            Teacher: {schedule.teacherId.firstName}{" "}
            {schedule.teacherId.lastName}
          </p>
        )}
        {showClass && schedule?.classId && (
          <p className="text-xs text-gray-600">
            Class: {schedule.classId.name} - {schedule.section}
          </p>
        )}
        <p className="text-xs text-gray-600">Room: {schedule?.room}</p>
        <p className="text-xs text-gray-600">
          Time: {schedule?.startTime} - {schedule?.endTime}
        </p>
      </div>
    </div>
  );
};

export default TimetableCard;
