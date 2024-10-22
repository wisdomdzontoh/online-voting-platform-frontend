import axios from "axios";
import { toast } from "react-toastify";

// Base API instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Set or Clear Authorization Token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Refresh Token Function
export const refreshTokenRequest = async (refreshToken) => {
  try {
    const { data } = await api.post("/token/refresh/", { refresh: refreshToken });
    return data;
  } catch (error) {
    toast.error("Session expired. Please log in again.");
    handleLogout(); 
    throw error;
  }
};

// Handle Logout Function
export const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  setAuthToken(null); 
  window.location.href = "/login"; 
};

// Logout Function with Toast Notification
export const logout = async () => {
  try {
    handleLogout(); 
    toast.success("Successfully logged out.");
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    console.error("Logout error:", error);
  }
};

// Axios Interceptor to Handle Token Expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const newTokens = await refreshTokenRequest(refreshToken);
          localStorage.setItem("access", newTokens.access);
          setAuthToken(newTokens.access); 
          return api(originalRequest); 
        } catch {
          toast.error("Session expired. Please log in again.");
          handleLogout(); 
        }
      } else {
        handleLogout(); 
      }
    }
    return Promise.reject(error);
  }
);

// Login Function
export const login = async (username, password) => {
  try {
    const { data } = await api.post("/token/", { username, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    setAuthToken(data.access); 
    return data;
  } catch (error) {
    toast.error("Invalid credentials. Please try again.");
    throw error;
  }
};

// Fetch Organizations
export const fetchOrganizations = async () => {
  try {
    const { data } = await api.get("/organizations/");
    return data;
  } catch {
    toast.error("Failed to fetch organizations.");
    throw new Error("Fetch organizations failed");
  }
};

// Create Organization
export const createOrganization = async (organizationData) => {
  try {
    const { data } = await api.post("/organizations/", organizationData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    const message = error.response?.data?.detail || "Failed to create organization";
    throw new Error(message);
  }
};

// Fetch Voting Sessions
export const fetchVotingSessions = async () => {
  try {
    const { data } = await api.get("/voting_sessions/");
    return data;
  } catch {
    toast.error("Failed to fetch voting sessions.");
    throw new Error("Fetch voting sessions failed");
  }
};

// Create Voting Session
export const createVotingSession = async (votingSessionData) => {
  try {
    const formData = new FormData();
    Object.entries(votingSessionData).forEach(([key, value]) => {
      formData.append(key, value instanceof Date ? value.toISOString() : value);
    });

    const { data } = await api.post("/voting_sessions/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Voting session created successfully!");
    return data;
  } catch (error) {
    const message =
      error.response?.data?.organization?.[0] ||
      error.response?.data?.detail ||
      "Failed to create voting session";
    console.error("Error response:", error.response?.data);
    toast.error(message);
    throw new Error(message);
  }
};

// Delete Voting Session
export const deleteVotingSession = async (sessionId) => {
  try {
    await api.delete(`/voting_sessions/${sessionId}/`);
    toast.success("Voting session deleted successfully!");
  } catch (error) {
    const message = error.response?.data?.detail || "Failed to delete voting session.";
    toast.error(message);
    throw new Error(message);
  }
};

// Fetch Positions
export const fetchPositions = async () => {
  try {
    const { data } = await api.get("/positions/");
    return data;
  } catch {
    toast.error("Failed to fetch positions.");
    throw new Error("Fetch positions failed");
  }
};

// Fetch Candidates
export const fetchCandidates = async () => {
  try {
    const { data } = await api.get("/candidates/");
    return data;
  } catch {
    toast.error("Failed to fetch candidates.");
    throw new Error("Fetch candidates failed");
  }
};

// Fetch Voters
export const fetchVoters = async () => {
  try {
    const { data } = await api.get("/voters/");
    return data;
  } catch {
    toast.error("Failed to fetch voters.");
    throw new Error("Fetch voters failed");
  }
};

// Export All Functions
export default {
  login,
  fetchOrganizations,
  fetchVotingSessions,
  fetchPositions,
  fetchCandidates,
  fetchVoters,
  refreshTokenRequest,
  setAuthToken,
  createOrganization,
  createVotingSession,
  deleteVotingSession,
  logout,
};
