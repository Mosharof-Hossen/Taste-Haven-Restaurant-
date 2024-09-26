import { useMutation } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const useFetchPostUserInfo = () => {
    const axios = useAxios();

    const userInfoPostFunction = async (user) => {
        const res = await axios.post('/users', user);
        return res.data;
    }
    const userInfoMutation = useMutation({
        mutationKey: ["userInfo"],
        mutationFn: userInfoPostFunction,
        
    })
    return userInfoMutation;
};

export default useFetchPostUserInfo;