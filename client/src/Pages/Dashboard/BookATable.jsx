import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';

const BookATable = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (
        <div className="p-5">
            <SectionTitle heading={'book a table'} subHeading={'Reservation'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Date*</span>
                            </label>
                            <input type="date" className="input input-bordered"{...register("date")} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Time*</span>
                            </label>
                            <input type="text" placeholder="---PM/AM" className="input input-bordered"{...register("time")} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Guest*</span>
                            </label>
                            <input type="number" placeholder="1 Person"{...register("guest")} className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Name*</span>
                            </label>
                            <input type="text"{...register("name")} placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Phone*</span>
                            </label>
                            <input type="text" {...register("phone")} placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email*</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="Email" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#D1A054] text-white w-full md:w-1/3 mx-auto">Boo A Table</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookATable;