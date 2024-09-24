import loginImage from "../../assets/others/authentication2.png"
import bg from "../../assets/others/authentication.png"
import { useForm } from "react-hook-form"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from "react";


const Login = () => {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);


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

    const onSubmit = (data) => console.log(data)
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
                                {
                                    errors?.password?.type == "required" && <p className="text-sm text-red-500 p-1">Password is Required</p>
                                }

                            </div>

                            <div className="form-control mt-6">
                                <button disabled={!isCaptchaValid} className="btn hover:bg-[#c29046] bg-[#D1A054] text-white text-xl">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;