import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useFetchGetCarts from './useFetchGetCarts';

const useFetchDeleteItemFromCart = () => {
    const {cartItemRefetch} = useFetchGetCarts()
    const axios = useAxios();
    const deleteFunction = async (id) => {
        const res = await axios.delete(`carts/${id}`);
        return res.data;
    }
    const itemDeleteMutation = useMutation({
        mutationKey: ["deleteCartItem"],
        mutationFn: deleteFunction,
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Your Item has been deleted.",
                icon: "success"
            });
            cartItemRefetch()
        }

    })
    return itemDeleteMutation;
};

export default useFetchDeleteItemFromCart;