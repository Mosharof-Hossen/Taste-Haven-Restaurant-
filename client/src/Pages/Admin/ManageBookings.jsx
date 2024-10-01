import Swal from "sweetalert2";
import useFetchGetMyBookigs from "../../API/useFetchGetMyBookigs";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaRegCheckCircle } from "react-icons/fa";
import useFetchUpdateBookingsStatus from "../../API/useFetchUpdateBookingsStatus";

const ManageBookings = () => {
    const { data, isLoading } = useFetchGetMyBookigs();
    const bookingManageMutation = useFetchUpdateBookingsStatus();
    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    const handleUpdateStatus = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "Are You Want to change status",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                bookingManageMutation.mutate(id);
            }
        });
    }
    return (
        <div>
            <SectionTitle heading={'my bookings'} subHeading={"Excellent Ambience"}></SectionTitle>
            <div className="lg:w-11/12 bg-white lg:mx-auto p-5 rounded m-5 lg:m-0">
                <div className="flex justify-between ">
                    <h3 className="text-xl font-bold font-cinzel-c">Total BOOKINGS:{data.length}</h3>
                </div>
                <div className="mt-5">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra ">
                            {/* head */}
                            <thead className="">
                                <tr className="bg-[#D1A054] uppercase text-white font-semibold ">
                                    <th className="rounded-tl-2xl"></th>
                                    <th>name</th>
                                    <th>guest</th>
                                    <th>email</th>
                                    <th>date</th>
                                    <th>phone</th>
                                    <th>time</th>
                                    <th>status</th>
                                    <th className="rounded-tr-2xl">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    data.map((item, i) => <tr key={item._id}>
                                        <th>{i + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.guest}</td>
                                        <td>{item.email}</td>
                                        <td>{item.date}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.time}</td>
                                        <td className={item.status == "pending" ? 'text-orange-500' : "text-green-600"}>{item.status}</td>
                                        <td>
                                            <button onClick={() => handleUpdateStatus(item._id)} className={item.status == "pending" ? "p-2 bg-red-500 rounded text-white text-xl" : "p-2 bg-green-500 rounded text-white text-xl"}><FaRegCheckCircle ></FaRegCheckCircle ></button>
                                        </td>
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

export default ManageBookings;