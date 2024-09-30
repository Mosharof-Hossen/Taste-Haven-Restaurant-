import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaProductHunt, FaUser, FaUsers, FaWallet } from "react-icons/fa";

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
            <div className="space-y-6">
                <h2 className="text-3xl font-cinzel-c font-bold">Hi,Welcome back</h2>
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                    <div className="gap-5 text-center text-white flex items-center bg-gradient-to-r from-blue-600 to-blue-300 p-5 rounded">
                        <FaWallet className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.revenue}</h2>
                            <p className="text-2xl">Revenue</p>
                        </div>
                    </div>
                    <div className="gap-5 text-center text-white justify-center flex items-center bg-gradient-to-r from-red-600 to-red-300 p-5 rounded">
                        <FaUsers className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.users}</h2>
                            <p className="text-2xl">Customers</p>
                        </div>
                    </div>
                    <div className="gap-5 text-center text-white justify-center flex items-center bg-gradient-to-r from-green-600 to-green-300 p-5 rounded">
                        <FaProductHunt className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.menuItem}</h2>
                            <p className="text-2xl">Products</p>
                        </div>
                    </div>
                    <div className="gap-5 text-center text-white justify-center flex items-center bg-gradient-to-r from-yellow-600 to-yellow-300 p-5 rounded">
                        <FaProductHunt className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.orders}</h2>
                            <p className="text-2xl">Orders</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminHome;