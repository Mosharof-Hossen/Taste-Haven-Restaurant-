import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../Hooks/useAuthContext";
import useAxios from "../Hooks/useAxios";


const useFetchGetCarts = () => {
    const { user,cartLoading } = useAuthContext();

    const axios = useAxios()
    const getCartFunction = async (email = "") => {
        const res = await axios.get(`/carts/${email}`, { withCredentials: true })
        return res.data;
    }
    const { data, refetch: cartItemRefetch, isLoading } = useQuery({
        queryKey: ["IndividualCartItem", user?.email],
        queryFn: () => getCartFunction(user?.email),
        enabled: !!user?.email && cartLoading,
    })

    return { data, cartItemRefetch, isLoading };
};

export default useFetchGetCarts;