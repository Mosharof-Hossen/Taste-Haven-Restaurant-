import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../Hooks/useAuthContext";
import useAxios from "../Hooks/useAxios";

const useFetchGetAdmin = () => {
    const axios = useAxios();
    const { user, loading } = useAuthContext()
    const { data, isLoading } = useQuery({
        queryKey: ["adminVerification", user?.email],
        queryFn: () => getAdminInfo(user?.email),
        enabled: !!user?.email,
    })
    if (loading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    const getAdminInfo = async (email) => {
        try {
            const res = await axios.get(`/user/admin/${email}`);
            return res.data;  // Ensure this returns a valid object or array
        } catch (error) {
            console.error("Error fetching admin info:", error);
            return null;  // Return null or an empty object in case of error
        }
    }

    return { data, isLoading }
};

export default useFetchGetAdmin;