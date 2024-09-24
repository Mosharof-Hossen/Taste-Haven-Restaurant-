import loginImage from "../../assets/others/authentication2.png"
import bg from "../../assets/others/authentication.png"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from 'sweetalert2'
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/Firebase";


const SignUp = () => {
    const [err, setErr] = useState("")
    const { createUserByEmailPass } = useAuthContext()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        createUserByEmailPass(data.email, data.password)
            .then((res) => {
                updateProfile(res.user, {
                    displayName: data.name,
                }).then(() => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Registration Successfully Done",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setErr("")
                        navigate("/")
                    })
                })

            }).catch(() => {
                setErr("Email already in use.")
            })
    }
    return (
        <div className=""
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="hero  min-h-screen p-10">
                <div className="hero-content border-2 shadow-lg md:p-10 mt-14 flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="card  w-full max-w-sm shrink-0 ">
                        <h3 className="font-bold text-4xl text-center">Sign Up</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-xl">Name</span>
                                </label>
                                <input type="text" placeholder="Enter Your Name" className="input input-bordered" {...register("name", { required: true })} />
                                {
                                    errors?.name?.type == "required" && <p className="text-sm text-red-500 p-1">Name is Required</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-xl">Email</span>
                                </label>
                                <input type="email" placeholder="Enter Your Email" className="input input-bordered" {...register("email", { required: true })} />
                                {
                                    errors?.email?.type == "required" && <p className="text-sm text-red-500 p-1">Email is Required</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-xl">Password</span>
                                </label>
                                <input type="password" placeholder="Enter Your Password" className="input input-bordered"  {...register("password", { required: true })} />
                                {
                                    errors?.password?.type == "required" && <p className="text-sm text-red-500 p-1">Password is Required</p>
                                }
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn hover:bg-[#c29046] bg-[#D1A054] text-white text-xl">Sign Up</button>
                                {
                                    err && <p className="text-red-500 font-semibold text-center mt-2">{err}</p>
                                }
                            </div>
                        </form>
                        <div className="space-y-3 mb-5">
                            <p className="text-center text-[#D1A054] font-semibold">Already registered? <Link to={"/login"}><span className="underline">Log In.</span></Link></p>
                            <p className="text-center font-semibold">Or sign in with</p>
                            <div className="flex justify-center gap-3">
                                <button className=" p-2 border-2 border-black rounded-full   "><FaGoogle className="text-2xl" /></button>
                                <button className=" p-2 border-2 border-black rounded-full   "><FaGithub className="text-2xl" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;