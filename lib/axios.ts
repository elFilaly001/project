import axios from "axios";

const api = axios.create({
    // baseURL is read from NEXT_PUBLIC_API_BASE_URL (e.g. http://localhost:3001)
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
