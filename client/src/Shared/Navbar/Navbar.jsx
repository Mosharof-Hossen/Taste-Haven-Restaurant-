import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";
import useFetchGetCarts from "../../API/useFetchGetCarts";


const Navbar = () => {
    const { user, logout } = useAuthContext();
    const { data } = useFetchGetCarts();
    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout Successfully Done",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }
    const links = <>
        <NavLink className={"md:ml-2 p-1 font-bold text-white"} to={"/"} ><li>HOME</li></NavLink>
        <NavLink className={"md:ml-2 p-1 font-bold text-white"} to={"/dashboard"} ><li>DASHBOARD</li></NavLink>
        <NavLink className={"md:ml-2 p-1 font-bold text-white"} to={"/our-menu"} ><li>OUR MENU</li></NavLink>
        <NavLink className={"md:ml-2 p-1 font-bold text-white"} to={"/our-shop"} ><li>OUR SHOP</li></NavLink>
        <NavLink className={"md:ml-2 p-1 font-bold text-white"} to={"/contact-us"} ><li>CONTACT US</li></NavLink>

    </>

    return (
        <div className="navbar fixed z-10 bg-black opacity-80 max-w-6xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-black opacity-80 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Link to={"/"}>
                    <button className="text-left text-white font-bold md:ml-5">
                        <h4 className="md:text-2xl text-lg font-bold uppercase">Taste Haven</h4>

                        <p className="hidden md:block font-cinzel-c text-sm">R E S T A U R A N T</p>
                    </button>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end space-x-6">
                {
                    user &&
                    <div className="indicator">
                        <span className="indicator-item badge bg-[#D1A054] rounded-full text-white">{data?.length}</span>
                        <Link to={"/dashboard/carts"}><button className="p-2 rounded-full text-white text-xl border-none"><FaCartPlus className="text-2xl" /></button></Link>
                    </div>
                }
                {
                    user ?
                        <button onClick={handleLogout} className="btn bg-[#D1A054] text-white text-xl border-none">Logout</button>
                        :
                        <Link to={'/login'}> <button className="btn bg-[#D1A054] text-white text-xl border-none">Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;