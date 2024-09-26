import axios from 'axios';
import { useEffect } from 'react';

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true
    })
    useEffect(() => {
        axiosInstance.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                if (err.response.status === 403) {
                    return [];
                }
            }
        )
    }, [axiosInstance])
    return axiosInstance;
};

export default useAxios;