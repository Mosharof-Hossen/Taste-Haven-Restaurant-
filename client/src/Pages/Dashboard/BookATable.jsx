import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import useFetchAddBookings from "../../API/useFetchAddBookings";

const BookATable = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const addBookingsMutation = useFetchAddBookings();
    const onSubmit = data => {
        addBookingsMutation.mutate({
            date: data.date,
            email: data.email,
            guest: data.guest,
            name: data.name,
            phone: data.phone,
            time: data.time,
            status: "pending"
        })
    };
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
                            <input type="text" {...register("phone")} placeholder="Phone Number" className="input input-bordered" required />
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
            <div>
                <SectionTitle heading={"our location"} subHeading={'Visit Us'}></SectionTitle>
                <div className="grid lg:grid-cols-3">
                    <div>
                        <button className="btn disabled bg-[#D1A054] text-white w-full rounded-none"><FaPhoneAlt /></button>
                        <div className="text-center bg-slate-200 p-5 ">
                            <h4 className="text-2xl">PHONE</h4>
                            <p>+088123456789</p>
                        </div>
                    </div>
                    <div>
                        <button className="btn disabled bg-[#D1A054] text-white rounded-none w-full"><FaLocationArrow /></button>
                        <div className="text-center bg-slate-200 p-5 ">
                            <h4 className="text-2xl">ADDRESS</h4>
                            <p>+08(812)3456789</p>
                        </div>
                    </div>
                    <div>
                        <button className="btn disabled bg-[#D1A054] text-white rounded-none w-full"><FaPhoneAlt /></button>
                        <div className="text-center bg-slate-200 p-5 ">
                            <h4 className="text-2xl">WORKING HOURS</h4>
                            <p> 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookATable;