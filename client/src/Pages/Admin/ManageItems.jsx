import Swal from "sweetalert2";
import useFetchAllItemsManage from "../../API/useFetchAllItemsManage";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetchDeleteItemAdmin from "../../API/useFetchDeleteItemAdmin";
import { useForm } from "react-hook-form";
import { TbToolsKitchen2 } from "react-icons/tb";
import { useState } from "react";
import axios from "axios";
import useFetchItemUpdateAdmin from "../../API/useFetchItemUpdateAdmin";

const ManageItems = () => {
    const itemUpdateMutation = useFetchItemUpdateAdmin()
    const [selectedItem, setSelectedItem] = useState([])
    const { data, isLoading } = useFetchAllItemsManage();
    const itemDeleteMutation = useFetchDeleteItemAdmin();
    const { register, handleSubmit, formState: { errors }, } = useForm();
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
    const handleEditItem = (id) => {
        document.getElementById('my_modal_5').showModal()
        const filteredItem = data.find(item => item._id == id);
        setSelectedItem(filteredItem);

    }
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        if (data.image.length > 0) {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
                imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.data.status == 200) {
                itemUpdateMutation.mutate({
                    id: selectedItem._id,
                    name: data.name,
                    recipe: data.recipeDetails,
                    image: res.data.data.display_url,
                    category: data.category,
                    price: parseFloat(data.price)

                })
            }
        }
        else {
            itemUpdateMutation.mutate({
                id: selectedItem._id,
                name: data.name,
                recipe: data.recipeDetails,
                category: data.category,
                price: parseFloat(data.price)
            })
        }


    };
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
            {/* ********** Modal************** */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-semibold">Recipe Name*</span>
                            </div>
                            <input type="text" defaultValue={selectedItem.name} placeholder="Recipe Name" className="input input-bordered w-full " {...register("name", { required: true })} />
                            {
                                errors?.name?.type == "required" && <p className="text-sm text-red-500 p-1">Recipe Name is Required</p>
                            }
                        </label>
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text font-semibold">Category*</span>
                                    </div>
                                    <select defaultValue={selectedItem.category} className="select select-bordered w-full "{...register("category", { required: true })}>
                                        <option value={"salad"}>Salad</option>
                                        <option value={"pizza"}>Pizza</option>
                                        <option value={"soup"}>Soup</option>
                                        <option value={"dessert"}>Dessert</option>
                                        <option value={"drinks"}>Drinks</option>

                                    </select>
                                    {
                                        errors?.category?.type == "required" && <p className="text-sm text-red-500 p-1">Category is Required</p>
                                    }
                                </label>
                            </div>
                            <div className="flex-1">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text font-semibold">Price*</span>
                                    </div>
                                    <input type="text" defaultValue={selectedItem.price} placeholder="Price" className="input input-bordered w-full " {...register("price", { required: true })} />
                                    {
                                        errors?.price?.type == "required" && <p className="text-sm text-red-500 p-1">Price is Required</p>
                                    }
                                </label>
                            </div>
                        </div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-semibold">Recipe*</span>
                            </div>
                            <textarea
                                defaultValue={selectedItem.recipe}
                                placeholder="Recipe Details" {...register("recipeDetails", { required: true })}
                                className="textarea textarea-bordered textarea-lg w-full text-justify"></textarea>
                            {
                                errors?.recipeDetails?.type == "required" && <p className="text-sm text-red-500 p-1">Recipe Details is Required</p>
                            }
                        </label>
                        <input type="file" className="file-input w-full max-w-xs" {...register("image")} />

                        <br />
                        <button type="submit" className="bg-[#D99904] mx-auto text-xl px-3 py-2 rounded text-white flex items-center" >Add Item <TbToolsKitchen2 /></button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default ManageItems;