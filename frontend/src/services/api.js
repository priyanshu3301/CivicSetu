import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Important for HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for global error handling (optional but good practice)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Handle unauthorized access (e.g., redirect to login)
            // But be careful not to cause loops if the check-auth endpoint itself fails
        }
        return Promise.reject(error);
    }
);

export default api;
