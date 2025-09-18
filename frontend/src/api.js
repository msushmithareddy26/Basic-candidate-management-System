import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCandidates = () => api.get("/candidates/");
export const createCandidate = (data) => api.post("/candidates/", data);
export const updateCandidate = (id, data) => api.put(`/candidates/${id}/`, data);
export const deleteCandidate = (id) => api.delete(`/candidates/${id}/`);

export default api;
