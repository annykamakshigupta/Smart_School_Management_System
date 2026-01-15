import axios from "axios";
import BASE_URL from "../config/baseUrl";

const API_URL = `${BASE_URL}`;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("ssms_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

/**
 * Get current user's ID from storage
 */
const getCurrentUserId = () => {
  const userData = localStorage.getItem("ssms_user");
  if (!userData) {
    throw new Error("User not authenticated");
  }
  return JSON.parse(userData).id;
};

/**
 * Get current teacher's assigned classes and subjects
 * Auto-fetches based on logged-in teacher's ID
 */
export const getMyAssignments = async () => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.get(
      `${API_URL}/admin/teachers/${userId}/assignments`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching assignments"
    );
  }
};

/**
 * Get students in a specific class
 */
export const getStudentsByClass = async (classId) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/students/class/${classId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching students");
  }
};

/**
 * Get teacher's schedule
 */
export const getMySchedule = async () => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.get(
      `${API_URL}/schedules?teacherId=${userId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching schedule");
  }
};

/**
 * Get subjects assigned to teacher
 */
export const getMySubjects = async () => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.get(
      `${API_URL}/subjects?teacherId=${userId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching subjects");
  }
};

/**
 * Get classes assigned to teacher (as class teacher)
 */
export const getMyClasses = async () => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.get(
      `${API_URL}/classes?classTeacher=${userId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching classes");
  }
};

export default {
  getMyAssignments,
  getStudentsByClass,
  getMySchedule,
  getMySubjects,
  getMyClasses,
};
