import { FaStar } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useFetchAddReview from "../../../API/useFetchAddReview";
import useAuthContext from "../../../Hooks/useAuthContext";

const AddReview = () => {
    const { user } = useAuthContext()
    const { register, handleSubmit, } = useForm();
    const addReviewMutation = useFetchAddReview();
    const onSubmit = data => {
        addReviewMutation.mutate({
            name: data.name,
            details: data.details,
            rating: parseInt(data.rating),
            email: user.email,
        })
    };
    return (
        <div>
            <SectionTitle heading={'give a review'} subHeading={"Sharing is Caring"}></SectionTitle>
            <div className="lg:w-11/12 bg-white lg:mx-auto p-5 rounded m-5 lg:m-0">
                <div className="space-y-2">
                    <h4 className="text-3xl font-bold font-cinzel-c text-center"> rate us!</h4>
                    <div className="flex justify-center gap-2">
                        <FaStar className="text-3xl text-gray-400"></FaStar>
                        <FaStar className="text-3xl text-gray-400"></FaStar>
                        <FaStar className="text-3xl text-gray-400"></FaStar>
                        <FaStar className="text-3xl text-gray-400"></FaStar>
                        <FaStar className="text-3xl text-gray-400"></FaStar>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                    <div className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Name*</span>
                            </label>
                            <input type="text"{...register("name")} placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Rating*</span>
                            </label>
                            <input type="number" {...register("rating")} placeholder="Rating(0-5)" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Details*</span>
                            </label>
                            <textarea type="text" {...register("details")} placeholder="Details" className="textarea textarea-bordered" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#D1A054] text-white w-full md:w-1/3 mx-auto">Send Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;