import axios from 'axios'
import { apiBaseURL, getAllLocatData } from '../components/Utility';

export const axiosInstance = axios.create({
    baseURL: apiBaseURL(),
    
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
function getAuthToken() {
    return getAllLocatData()?.token
}