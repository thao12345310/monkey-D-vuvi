import axios from "axios";

const API_URL = "http://localhost:8080/api/booking";



export const getMyBookings = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/my-bookings`, {
            headers: {
                Authorization: `Bearer ${token}`,
                
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
