import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from 'sweetalert2';
import useFetchAllItemsManage from "./useFetchAllItemsManage";

const useFetchDeleteItemAdmin = () => {
    const { refetch } = useFetchAllItemsManage()
    const axios = useAxios();
    const deleteFunction = async (id) => {
        const res = await axios.delete(`/admin/manage-item/${id}`)
        return res.data;
    }
    const itemDeleteMutation = useMutation({
        mutationKey: ['itemDelete'],
        mutationFn: deleteFunction,
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Your Item has been deleted.",
                icon: "success"
            });
            refetch()
        }
    })
    return itemDeleteMutation
};

export default useFetchDeleteItemAdmin;