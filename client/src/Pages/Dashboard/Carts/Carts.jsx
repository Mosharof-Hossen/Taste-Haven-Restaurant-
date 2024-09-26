import { FaTrash } from "react-icons/fa";
import useFetchGetCarts from "../../../API/useFetchGetCarts";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useFetchDeleteItemFromCart from "../../../API/useFetchDeleteItemFromCart";

const Carts = () => {
    const { data, isLoading } = useFetchGetCarts();
    const itemDeleteMutation = useFetchDeleteItemFromCart()

    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    const totalPrice = data.reduce((total, item) => total + item.price, 0);

    const handleDeleteItemFromCart = (id) => {
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
    return (
        <div className="">
            <SectionTitle heading={"wanna add More?"} subHeading={"MY Cart"}></SectionTitle>
            <div className="lg:w-11/12 bg-white lg:mx-auto p-5 rounded m-5 lg:m-0">
                <div className="flex justify-between ">
                    <h3 className="text-2xl font-bold font-cinzel-c">Total Orders:{data.length}</h3>
                    <h3 className="text-2xl font-bold font-cinzel-c">Total Price: ${totalPrice}</h3>
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
                                        <td>{item.itemName}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <button onClick={() => handleDeleteItemFromCart(item._id)} className="p-2 bg-red-700 rounded text-white text-xl"><FaTrash></FaTrash></button>
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

export default Carts;