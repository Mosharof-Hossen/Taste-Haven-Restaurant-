import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useFetchAddBookings = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    const addBookingsFunction = async (data) => {
        const res = await axios.post("/clint-bookings", data);
        return res.data;
    }
    const addBookingsMutation = useMutation({
        mutationKey: ["add-Bookings"],
        mutationFn: addBookingsFunction,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Booking Done",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/dashboard/my-booking")
            })
        }
    })
    return addBookingsMutation
};

export default useFetchAddBookings;
