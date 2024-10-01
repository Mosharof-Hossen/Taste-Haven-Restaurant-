import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchGetMyBookigs from "./useFetchGetMyBookigs";

const useFetchDeleteBookings = () => {
    const { refetch } = useFetchGetMyBookigs()
    const axios = useAxios();
    const deleteFunction = async (id) => {
        const res = await axios.delete(`/my-bookings/${id}`,)
        return res.data;
    }
    const bookingsDeleteMutation = useMutation({
        mutationKey: ["Delete-bookings"],
        mutationFn: deleteFunction,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delete Done",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                refetch()
            })
        }
    })
    return bookingsDeleteMutation;
};

export default useFetchDeleteBookings;