import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchReviews = (url) => {
    const axios = useAxios()
    const result = async () => {
        const res = await axios.get(url);
        return res.data;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ["reviews", url],
        queryFn: result,
    })

    return { data, error, isLoading }
};

export default useFetchReviews;