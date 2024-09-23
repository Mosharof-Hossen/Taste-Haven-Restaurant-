import useAxios from "../Hooks/useAxios";

const useFetchMenu = (url) => {
    const axios = useAxios()
    const result = async () => {
        const res = await axios.get(url);
        return res.data;
    }
    return result
};

export default useFetchMenu;