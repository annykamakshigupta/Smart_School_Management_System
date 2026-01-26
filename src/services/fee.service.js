/**
 * Fee Service
 * Handles all fee-related API calls
 */

import axios from "axios";
import BASE_URL from "../config/baseUrl";

const API_URL = `${BASE_URL}/fees`;

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
 * Create a new fee entry
 */
export const createFee = async (feeData) => {
  try {
    const response = await axios.post(API_URL, feeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating fee");
  }
};

/**
 * Create bulk fee entries
 */
export const createBulkFees = async (bulkData) => {
  try {
    const response = await axios.post(
      `${API_URL}/bulk`,
      bulkData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating bulk fees",
    );
  }
};

/**
 * Get all fees with filters
 */
export const getAllFees = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.feeType) params.append("feeType", filters.feeType);
    if (filters.paymentStatus)
      params.append("paymentStatus", filters.paymentStatus);
    if (filters.academicYear)
      params.append("academicYear", filters.academicYear);
    if (filters.period) params.append("period", filters.period);
    if (filters.classId) params.append("classId", filters.classId);

    const url = params.toString() ? `${API_URL}?${params}` : API_URL;
    const response = await axios.get(url, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching fees");
  }
};

/**
 * Get fees by student
 */
export const getFeesByStudent = async (studentId, filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.feeType) params.append("feeType", filters.feeType);
    if (filters.paymentStatus)
      params.append("paymentStatus", filters.paymentStatus);
    if (filters.academicYear)
      params.append("academicYear", filters.academicYear);

    const url = params.toString()
      ? `${API_URL}/student/${studentId}?${params}`
      : `${API_URL}/student/${studentId}`;
    const response = await axios.get(url, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching fees");
  }
};

/**
 * Get my fees (for logged-in student)
 */
export const getMyFees = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.feeType) params.append("feeType", filters.feeType);
    if (filters.paymentStatus)
      params.append("paymentStatus", filters.paymentStatus);
    if (filters.academicYear)
      params.append("academicYear", filters.academicYear);

    const url = params.toString() ? `${API_URL}/my?${params}` : `${API_URL}/my`;
    const response = await axios.get(url, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching fees");
  }
};

/**
 * Record payment for a fee
 */
export const recordPayment = async (feeId, paymentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${feeId}/pay`,
      paymentData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error recording payment");
  }
};

/**
 * Update a fee
 */
export const updateFee = async (feeId, feeData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${feeId}`,
      feeData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating fee");
  }
};

/**
 * Delete a fee
 */
export const deleteFee = async (feeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${feeId}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting fee");
  }
};

/**
 * Get fee statistics summary
 */
export const getFeeStats = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.academicYear)
      params.append("academicYear", filters.academicYear);
    if (filters.classId) params.append("classId", filters.classId);

    const url = params.toString()
      ? `${API_URL}/stats/summary?${params}`
      : `${API_URL}/stats/summary`;
    const response = await axios.get(url, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching fee stats",
    );
  }
};

export default {
  createFee,
  createBulkFees,
  getAllFees,
  getFeesByStudent,
  getMyFees,
  recordPayment,
  updateFee,
  deleteFee,
  getFeeStats,
};
