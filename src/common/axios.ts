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

// -------------- AWS PoC 계정에 있는 외부 APIGateway URL 설정 --------------
const aiAxiosInstance = axios.create({
    baseURL: 'aws poc api url',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

aiAxiosInstance.interceptors.request.use(
    (config) => {
        // TODO Add any request interceptors here
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

aiAxiosInstance.interceptors.response.use(
    (response) => {
        // TODO Add any response interceptors here
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export { axiosInstance, aiAxiosInstance };
