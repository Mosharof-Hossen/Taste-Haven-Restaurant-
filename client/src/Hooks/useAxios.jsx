import axios from 'axios';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/Firebase';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

const useAxios = () => {

    useEffect(() => {
        axiosInstance.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                console.log(err);
                if (err?.response?.status === 403 || err?.response?.status === 404) {
                    signOut(auth);
                }
            }
        )
    }, [])


    // if (loading) {
    //     return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    // }

    return axiosInstance;
};

export default useAxios;