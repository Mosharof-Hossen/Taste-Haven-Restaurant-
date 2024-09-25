import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import useFetchGetCarts from './useFetchGetCarts';

const useFetchPostCartItem = () => {
    const axios = useAxios()
    const { cartItemRefetch } = useFetchGetCarts();
    const cartFunction = async (item) => {
        const res = await axios.post("/carts", item);
        return res.data
    }

    const cartsMutation = useMutation({
        mutationFn: cartFunction,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Added",
                showConfirmButton: false,
                timer: 1500
            })
            cartItemRefetch()
        }
    })
    return cartsMutation;
};

export default useFetchPostCartItem;