import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxios from "../../../Hooks/useAxios";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const PaymentHistory = () => {
    const { user } = useAuthContext();
    const axios = useAxios()
    const { data } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axios.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    console.log(data);
    return (
        <div className="">
            <SectionTitle heading={"payment history"} subHeading={"Al A Glance !"}></SectionTitle>
            <div className="lg:w-11/12 bg-white lg:mx-auto p-5 rounded m-5 lg:m-0">
                <div className="flex justify-between ">
                    <h3 className="text-xl font-bold font-cinzel-c">Total Payments:{data.length}</h3>
                </div>
                <div className="mt-5">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra ">
                            {/* head */}
                            <thead className="">
                                <tr className="bg-[#D1A054] text-white font-semibold ">
                                    <th className="rounded-tl-2xl"></th>
                                    <th>EMAIL</th>
                                    <th>TOTAL PRICE</th>
                                    <th>PAYMENT DATE </th>
                                    <th className="rounded-tr-2xl">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    data.map((item, i) => <tr key={item._id}>
                                        <th>{i + 1}</th>

                                        <td>{item.email}</td>
                                        <td>${item.price}</td>
                                        <td>{item.date.split("T")[0]}</td>
                                        <td>{item.status}</td>

                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;