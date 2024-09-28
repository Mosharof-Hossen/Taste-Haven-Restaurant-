import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { TbToolsKitchen2 } from "react-icons/tb";
import { useForm } from 'react-hook-form';
import useAxios from "../../Hooks/useAxios";

const AddItem = () => {
    const axios = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const res = await axios.post(`https://api.imgbb.com/1/upload/${data.image[0]}`)
        console.log(res.data);
    };
    console.log(errors);

    return (
        <div>
            <SectionTitle heading={"add an item"} subHeading={"What's new?"}></SectionTitle>
            <div className="lg:w-11/12 bg-white lg:mx-auto p-5 rounded m-5 lg:m-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </div>
                        <input type="text" placeholder="Recipe Name" className="input input-bordered w-full " {...register("recipe", { required: true })} />
                        {
                            errors?.recipe?.type == "required" && <p className="text-sm text-red-500 p-1">Recipe Name is Required</p>
                        }
                    </label>
                    <div className="flex gap-5">
                        <div className="flex-1">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text font-semibold">Category*</span>
                                </div>
                                <select defaultValue={"Category"} className="select select-bordered w-full "{...register("category", { required: true })}>
                                    <option disabled value={"Category"} >Category</option>
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
                                <input type="text" placeholder="Price" className="input input-bordered w-full " {...register("price", { required: true })} />
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
                            placeholder="Recipe Details" {...register("recipeDetails", { required: true })}
                            className="textarea textarea-bordered textarea-lg w-full text-justify"></textarea>
                        {
                            errors?.recipeDetails?.type == "required" && <p className="text-sm text-red-500 p-1">Recipe Details is Required</p>
                        }
                    </label>
                    <input type="file" className="file-input w-full max-w-xs" {...register("image", { required: true })} />
                    {
                        errors?.image?.type == "required" && <p className="text-sm text-red-500 p-1">Image is Required</p>
                    }
                    <br />
                    <button type="submit" className="bg-[#D99904] text-xl px-3 py-2 rounded text-white flex items-center" >Add Item <TbToolsKitchen2 /></button>
                </form>
            </div >
        </div >
    );
};

export default AddItem;