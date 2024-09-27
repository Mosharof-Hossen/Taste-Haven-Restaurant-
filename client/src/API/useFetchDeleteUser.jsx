import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchGetAllUsers from "./useFetchGetAllUsers";

const useFetchDeleteUser = () => {
    const { refetch } = useFetchGetAllUsers()
    const axios = useAxios();
    const deleteFunction = async (email) => {
        const res = await axios.delete(`/admin/users/${email}`);
        return res.data;
    }
    const userDeleteMutation = useMutation({
        mutationKey: ["deleteUser"],
        mutationFn: deleteFunction,
        onSuccess: (data) => {
            console.log(data);
            Swal.fire({
                title: "Deleted!",
                text: "User Removed.",
                icon: "success"
            });
            refetch()
        }
    })
    return userDeleteMutation;
};

export default useFetchDeleteUser;