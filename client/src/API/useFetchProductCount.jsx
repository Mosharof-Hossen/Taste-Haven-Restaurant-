import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useFetchProductCount = (url) => {
    const axios = useAxios();
    const result = async () => {
        const res = await axios.get(url);
        return res.data;
    }
    const { data, error, isLoading } = useQuery({
        queryKey: ["Data-count", url],
        queryFn: result,
    })
    return { data, error, isLoading };
};

export default useFetchProductCount;