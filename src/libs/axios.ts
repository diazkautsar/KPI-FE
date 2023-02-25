import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
        config.baseURL = import.meta.env.VITE_BE_SERVICES_HOST;

        const token = localStorage.getItem('access_token');
        if (token) {
            // Add Authorization header if it doesn't exist
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config as InternalAxiosRequestConfig;
    },
    (error: AxiosError) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
