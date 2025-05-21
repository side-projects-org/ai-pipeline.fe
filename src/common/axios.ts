import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://h4ucuhwxha.execute-api.ap-northeast-2.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

axiosInstance.interceptors.request.use(
    (config) => {
        // TODO Add any request interceptors here
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // TODO Add any response interceptors here
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export default axiosInstance;
