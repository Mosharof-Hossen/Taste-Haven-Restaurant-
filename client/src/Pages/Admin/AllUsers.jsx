import { FaTrash } from "react-icons/fa";
import useFetchGetAllUsers from "../../API/useFetchGetAllUsers";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useFetchDeleteUser from "../../API/useFetchDeleteUser";

const AllUsers = () => {
    const userDeleteMutation = useFetchDeleteUser()
    const { data, isLoading } = useFetchGetAllUsers();
    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    const handleDeleteUserFromCollection = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You Want to Delete This User",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                userDeleteMutation.mutate(email);
            }
        });
    }
    console.log(data);

    return (
        <div className="">
            <SectionTitle heading={"MANAGE ALL USERS"} subHeading={"How Many?"}></SectionTitle>
            <div className="lg:w-11/12 bg-white lg:mx-auto p-5 rounded m-5 lg:m-0">
                <div className="flex justify-between ">
                    <h3 className="text-2xl font-bold font-cinzel-c">Total Users: {data.length}</h3>
                    {/* <h3 className="text-2xl font-bold font-cinzel-c">Total Price: ${totalPrice}</h3> */}
                </div>
                <div className="mt-5">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra ">
                            {/* head */}
                            <thead className="">
                                <tr className="bg-[#D1A054] text-white font-semibold ">
                                    <th className="rounded-tl-2xl"></th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th className="rounded-tr-2xl">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    data.map((user, i) => <tr key={user._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button onClick={() => handleDeleteUserFromCollection(user.email)} className="p-2 bg-red-700 rounded text-white text-xl"><FaTrash></FaTrash></button>
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

export default AllUsers;