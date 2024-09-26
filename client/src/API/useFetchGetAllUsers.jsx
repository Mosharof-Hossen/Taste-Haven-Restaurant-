import useAuthContext from '../Hooks/useAuthContext';
import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchGetAllUsers = () => {
    const { user } = useAuthContext();
    const axios = useAxios();
    const getAllUsersFunction = async (email) => {
        const res = await axios.get(`/admin/users/${email}`);
        return res.data;
    }
    const { data, isLoading } = useQuery({
        queryKey: ["allUsers", user?.email],
        queryFn: () => getAllUsersFunction(user?.email),
        enabled: !!user?.email
    })
    return { data, isLoading }
};

export default useFetchGetAllUsers;