import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const sendChatMessage = async (sessionId, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      sessionId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    // Mock response fallback for UI testing when backend is offline
    return {
      sessionId,
      type: "ERROR",
      message: "Unable to connect to Spring Boot backend. Please check if server is running on port 8080."
    };
  }
};