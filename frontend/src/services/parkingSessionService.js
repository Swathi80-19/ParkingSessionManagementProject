import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Add a new parking session
 * POST /parkingsession/add
 */
export const addParkingSession = async (sessionData) => {
  const response = await api.post('/parkingsession/add', sessionData);
  return response.data;
};

/**
 * Display all parking sessions
 * GET /parkingsession/dipsplayall
 */
export const displayAllParkingSessions = async () => {
  const response = await api.get('/parkingsession/dipsplayall');
  return response.data;
};

/**
 * Display parking session by ID
 * GET /parkingsession/displayparkingsessionbyid/{id}
 */
export const displayParkingSessionById = async (id) => {
  const response = await api.get(`/parkingsession/displayparkingsessionbyid/${id}`);
  return response.data;
};

/**
 * Delete parking session by ID
 * DELETE /parkingsession/deleteparkingsessionbyid/{id}
 */
export const deleteParkingSessionById = async (id) => {
  await api.delete(`/parkingsession/deleteparkingsessionbyid/${id}`);
};

export default api;
