import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../Hooks/useAuthContext";
import useAxios from "../Hooks/useAxios";

const useFetchGetAdmin = () => {
    const axios = useAxios();
    const { user } = useAuthContext()

    const getAdminInfo = async (email) => {
        const res = await axios.get(`/user/admin/${email}`);
        return res.data;
    }
    const { data, refetch } = useQuery({
        queryKey: ["adminVerification", user.email],
        queryFn: () => getAdminInfo(user.email),
        enabled: !!user.email,
    })
    return { data, refetch }
};

export default useFetchGetAdmin;