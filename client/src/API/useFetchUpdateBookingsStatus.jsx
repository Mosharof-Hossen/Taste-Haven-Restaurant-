import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import useFetchGetMyBookigs from "./useFetchGetMyBookigs";

const useFetchUpdateBookingsStatus = () => {
    const { refetch } = useFetchGetMyBookigs()
    const axios = useAxios();
    const updateBookings = async (id) => {
        const res = await axios.patch(`/booking-manage/${id}`);
        return res.data;
    }
    const bookingManageMutation = useMutation({
        mutationKey: ["booking-manage"],
        mutationFn: updateBookings,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Updated Done",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                refetch()
            })
        }
    })
    return bookingManageMutation;
};

export default useFetchUpdateBookingsStatus;