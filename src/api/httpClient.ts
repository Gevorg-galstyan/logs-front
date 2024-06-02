import axios, { InternalAxiosRequestConfig } from 'axios';

import type { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
    baseURL: "https://logs-back.vercel.app/",
    timeout: 300000,
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    withCredentials: false, // Поддержка кук
});

type Config = InternalAxiosRequestConfig<unknown>;


httpClient.interceptors.request.use((config: Config): Config => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    config.headers.Authorization = localStorage.getItem('token');

    return config;
});

httpClient.interceptors.response.use(
    response => response,
        error => {

    const { status } = error.response ?? {};

    if (status && status === 401) {
        console.log('Unauthorized')
        localStorage.removeItem('token');

        window.location.href = '/login';

        return;
    }
});


export default httpClient;
