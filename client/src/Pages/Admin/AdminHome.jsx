import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const AdminHome = () => {
    const axios = useAxios()
    const { data: stats, isLoading } = useQuery({
        queryKey: ["Admin-stats"],
        queryFn: async () => {
            const res = await axios("/admin-stats");
            return res.data;
        }
    })

    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    console.log(stats);
    return (
        <div className="p-5">
            <div>
                <h2 className="text-3xl font-cinzel-c font-bold">Hi,Welcome back</h2>
            </div>
        </div>
    );
};

export default AdminHome;