import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';

const useFetchAllItemsManage = () => {
    const axios = useAxios()
    const getAllItems = async () => {
        const res = await axios.get('/admin/manage-item');
        return res.data;
    }
    const { data, isLoading ,refetch} = useQuery({
        queryKey: ["allItems"],
        queryFn: getAllItems,
    })
    return { data, isLoading,refetch }
};

export default useFetchAllItemsManage;

