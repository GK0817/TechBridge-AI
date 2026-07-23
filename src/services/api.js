import axios from 'axios';

// 🚀 Changed from 8080/api to Flask's Port 5000
const API_BASE_URL = 'http://localhost:5000';

export const sendChatMessage = async (sessionId, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      sessionId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    // Fallback indicator
    return {
      sessionId,
      type: "ERROR",
      message: "Unable to connect to Flask backend. Please check if 'python app.py' is running on port 5000."
    };
  }
};