import { FaHome } from "react-icons/fa";
import errorImage from "../../assets/404.gif"
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className=" text-center">
            <img src={errorImage} alt="" className="mx-auto" />
            < Link to={"/"}>
                <button className="bg-[#D1A054] btn text-xl text-white">Back To Home <FaHome></FaHome></button>
            </Link>
        </div>
    );
};

export default ErrorPage;