import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxios from "../../../Hooks/useAxios";
import userImg from "../../../assets/user.png"
import { FaAlignJustify, FaRegStar, FaWallet } from "react-icons/fa";

const UserProfile = () => {
    const { user } = useAuthContext();
    const axios = useAxios()
    const { data, isLoading } = useQuery({
        queryKey: ["profileInfo"],
        queryFn: async () => {
            const res = await axios.get(`/user-profile/${user.email}`);
            return res.data
        },
        enabled: !!user.email
    })
    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    return (
        <div className="space-y-10 p-5">
            <h4 className="text-4xl font-cinzel-c font-bold">Hi, welcome back!</h4>
            <div className="flex md:flex-row flex-col gap-10">
                <div className="p-10 bg-white rounded-lg text-center space-y-5">
                    <img src={userImg} alt=""className="mx-auto" />
                    <p className="text-2xl font-bold">{user?.displayName}</p>
                </div>
                <div className="space-y-3">
                    <h3 className="text-4xl font-semibold">Your activities</h3>
                    <p className="uppercase flex items-center text-2xl gap-2 text-blue-500 font-semibold"><FaRegStar /> reviews: {data.reviews}</p>
                    <p className="uppercase flex items-center text-2xl gap-2 text-orange-500 font-semibold"><FaWallet /> Payment: {data.payment}</p>
                    <p className="uppercase flex items-center text-2xl gap-2 text-yellow-500 font-semibold"><FaAlignJustify /> bookings: {data.bookings}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;