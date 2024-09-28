import Swal from "sweetalert2";
import useFetchAllItemsManage from "../../API/useFetchAllItemsManage";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetchDeleteItemAdmin from "../../API/useFetchDeleteItemAdmin";

const ManageItems = () => {
    const { data, isLoading } = useFetchAllItemsManage();
    const itemDeleteMutation = useFetchDeleteItemAdmin();
    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    const handleDeleteItemByAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You Want to Delete This Item",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                itemDeleteMutation.mutate(id);
            }
        });
    }
    const handleEditItem = () => {

    }
    return (
        <div>
            <SectionTitle heading={"manage all items"} subHeading={"Hurry Up"}></SectionTitle>
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
                                    <th>ITEM IMAGE</th>
                                    <th>ITEM NAME</th>
                                    <th>PRICE</th>
                                    <th>Action</th>
                                    <th className="rounded-tr-2xl">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    data.map((item, i) => <tr key={item._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-12 rounded">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <button onClick={() => handleEditItem(item._id)} className="p-2 bg-blue-500 rounded text-white text-xl"><FaEdit></FaEdit></button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteItemByAdmin(item._id)} className="p-2 bg-red-700 rounded text-white text-xl"><FaTrash></FaTrash></button>
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

export default ManageItems;