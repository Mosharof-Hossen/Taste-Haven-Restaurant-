import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useFetchPostItem = () => {
    const axios = useAxios();
    const itemCreateFunction = async (item) => {
        const res = await axios.post("/admin/item", item)
        return res.data;
    }
    const itemCreateMutation = useMutation({
        mutationKey: ["itemCreate"],
        mutationFn: itemCreateFunction,
        onSuccess: () => {
            Swal.fire({
                title: "Recipe Added!",
                text: "OK Done",
                icon: "success"
            });
        }
    })
    return itemCreateMutation
};

export default useFetchPostItem;