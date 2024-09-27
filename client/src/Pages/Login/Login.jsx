import loginImage from "../../assets/others/authentication2.png"
import bg from "../../assets/others/authentication.png"
import { useForm } from "react-hook-form"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import useFetchPostUserInfo from "../../API/useFetchPostUserInfo";


const Login = () => {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const { loginByEmailPass, loginByGoogle, loginByGithub } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location);
    const [err, setErr] = useState("");
    const userInfoMutation = useFetchPostUserInfo();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handleCaptchaChange = e => {
        const data = e.target.value;
        if (validateCaptcha(data)) {
            setIsCaptchaValid(true)
        } else {
            setIsCaptchaValid(false)
        }
        console.log(data);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        loginByEmailPass(data.email, data.password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully Done",
                    showConfirmButton: false,
                    timer: 1500
                })
                    .then(() => {
                        navigate(location?.state ? location.state : "/");
                        setErr("")
                    })
            }).catch(() => {
                setErr("Invalid Email or Password.")
            })
    }

    const handleGoogleLogin = () => {
        loginByGoogle()
            .then((result) => {
                userInfoMutation.mutate({
                    email: result.user.email,
                    displayName: result.user.displayName,
                })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully Done",
                    showConfirmButton: false,
                    timer: 1500
                })
                    .then(() => {
                        navigate(location?.state ? location.state : "/");
                        setErr("")
                    })
            })
    }
    const handleGithubLogin = () => {
        loginByGithub()
            .then((result) => {
                userInfoMutation.mutate({
                    email: result.user.email,
                    displayName: result.user.displayName,
                })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully Done",
                    showConfirmButton: false,
                    timer: 1500
                })
                    .then(() => {
                        navigate(location?.state ? location.state : "/");
                        setErr("")
                    })
            })
    }
    return (
        <div className=""
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="hero  min-h-screen p-10">
                <div className="hero-content border-2 shadow-lg md:p-10 mt-14 flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="card  w-full max-w-sm shrink-0 ">
                        <h3 className="font-bold text-4xl text-center">Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" name="captcha" onBlur={handleCaptchaChange} placeholder="Enter the text above" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <button disabled={!isCaptchaValid} className="btn hover:bg-[#c29046] bg-[#D1A054] text-white text-xl">Login</button>
                                {
                                    err && <p className="text-red-500 text-center mt-2 font-semibold">{err}</p>
                                }
                            </div>
                        </form>
                        <div className="space-y-3 mb-5">
                            <p className="text-center text-[#D1A054] font-semibold">New here? Create A <Link to={"/signup"}><span className="underline">New Account.</span></Link></p>
                            <p className="text-center font-semibold">Or sign in with</p>
                            <div className="flex justify-center gap-3">
                                <button onClick={handleGoogleLogin} className=" p-2 border-2 border-black rounded-full   "><FaGoogle className="text-2xl" /></button>
                                <button onClick={handleGithubLogin} className=" p-2 border-2 border-black rounded-full   "><FaGithub className="text-2xl" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;