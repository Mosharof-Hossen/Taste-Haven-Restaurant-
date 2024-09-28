import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchAllItemsManage from "./useFetchAllItemsManage";

const useFetchItemUpdateAdmin = () => {
    const axios = useAxios();
    const { refetch } = useFetchAllItemsManage()
    const updateFunction = async (item) => {
        const res = await axios.patch(`/admin/manage-item`, item);
        return res.data;
    }
    const itemUpdateMutation = useMutation({
        mutationKey: ["UpdateItem"],
        mutationFn: updateFunction,
        onSuccess: () => {
            document.getElementById('my_modal_5').close()
            Swal.fire({
                title: "Item Updated",
                icon: "success"
            });
            refetch();

        }
    })
    return itemUpdateMutation
};

export default useFetchItemUpdateAdmin;