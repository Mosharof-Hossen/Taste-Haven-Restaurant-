import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {

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
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;