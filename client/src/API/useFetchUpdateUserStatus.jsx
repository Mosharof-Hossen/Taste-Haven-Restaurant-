import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useFetchGetAllUsers from './useFetchGetAllUsers';

const useFetchUpdateUserStatus = () => {
    const { refetch } = useFetchGetAllUsers()
    const axios = useAxios();
    const statusUpdateFunction = async (data) => {
        const res = await axios.put(`/admin/user/status`, data)
        return res.data;
    }
    const statusUpdateMutation = useMutation({
        mutationKey: ["userStatusUpdate"],
        mutationFn: statusUpdateFunction,
        onSuccess: (data) => {
            console.log(data);
            Swal.fire({
                title: "Updated!",
                text: "Status Changed.",
                icon: "success"
            });
            refetch()
        }
    })
    return statusUpdateMutation
};

export default useFetchUpdateUserStatus;