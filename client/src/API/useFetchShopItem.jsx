import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchShopItem = (tab, currentPage, limit) => {
    const axios = useAxios();
    const result = async () => {
        const res = await axios.get("/shop-item", {
            params: {
                category: tab,
                currentPage,
                limit
            }
        })
        return res.data;
    }
    const { data, isLoading, isError } = useQuery({
        queryKey: ["shop-item", tab, currentPage, limit],
        queryFn: result,
        
    })
    return { data, isError, isLoading }
};

export default useFetchShopItem;