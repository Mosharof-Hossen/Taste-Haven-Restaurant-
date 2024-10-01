import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";

const useFetchAddReview = () => {
    const axios = useAxios();
    const addReview = async (data) => {
        const res = await axios.post("/add-review", data);
        return res.data;
    }
    const addReviewMutation = useMutation({
        mutationKey: ["Add_Review"],
        mutationFn: addReview,
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thanks",
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    return addReviewMutation
};

export default useFetchAddReview;