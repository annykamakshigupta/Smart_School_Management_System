import axios from "axios";

const API_URL = "https://smart-school-backend-4ce1.onrender.com/api/users";

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

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const params = role ? `?role=${role}` : "";
    const response = await axios.get(`${API_URL}${params}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching users");
  }
};

// Get all teachers
export const getAllTeachers = async () => {
  return getUsersByRole("teacher");
};

export default {
  getUsersByRole,
  getAllTeachers,
};
