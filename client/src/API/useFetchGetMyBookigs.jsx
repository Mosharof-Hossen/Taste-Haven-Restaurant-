import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";


const useFetchGetMyBookigs = () => {
    const axios = useAxios()
    const { data, isLoading,refetch } = useQuery({
        queryKey: ["my-bookings"],
        queryFn: async () => {
            const res = await axios.get('/my-bookings');
            return res.data;
        }
    })
    return { data, isLoading,refetch }
};

export default useFetchGetMyBookigs;