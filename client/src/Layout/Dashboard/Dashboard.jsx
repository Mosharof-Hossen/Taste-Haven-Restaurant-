import { Link, NavLink, Outlet } from "react-router-dom";
import { MdEmail, MdOutlinePayment, MdOutlineReviews } from "react-icons/md";
import { FaAlignJustify, FaCalendarAlt, FaHome, FaRegAddressBook, FaShoppingBag, FaShoppingCart, FaUsers } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import useFetchGetAdmin from "../../API/useFetchGetAdmin";

const Dashboard = () => {
    const { data, isLoading } = useFetchGetAdmin();

    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    console.log(data);
    const admin = data.admin;
    const links = <>
        {
            admin ?
                <>
                    <NavLink to={"/dashboard/admin"} end className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaHome /> <li> Admin Home</li></NavLink>
                    <NavLink to={"/dashboard/admin/add-item"} end className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <TbToolsKitchen2 /> <li> add item</li></NavLink>
                    <NavLink to={"/dashboard/admin/manage-items"} end className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaAlignJustify /> <li> manage items</li></NavLink>
                    <NavLink to={"/dashboard/admin/manage-bookings"} end className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaRegAddressBook /> <li> manage bookings</li></NavLink>
                    <NavLink to={"/dashboard/admin/all-users"} end className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaUsers /> <li> all users</li></NavLink>
                </>
                :
                <>
                    <NavLink to={"/dashboard"} end className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaHome /> <li> Home</li></NavLink>
                    <NavLink to={"/dashboard/reservation"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaCalendarAlt /> <li> reservation</li></NavLink>
                    <NavLink to={"/dashboard/payment-history"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <MdOutlinePayment /> <li> Payment History</li></NavLink>
                    <NavLink to={"/dashboard/carts"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaShoppingCart /> <li> my cart</li></NavLink>
                    <NavLink to={"/dashboard/add-review"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <MdOutlineReviews /> <li> add review</li></NavLink>
                    <NavLink to={"/dashboard/my-booking"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaRegAddressBook /> <li> My booking</li></NavLink>
                </>
        }


        <div className="divider divider-warning"></div>

        <NavLink to={"/"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaRegAddressBook /> <li> Home</li></NavLink>
        <NavLink to={"/our-menu"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaAlignJustify /> <li> Menu</li></NavLink>
        <NavLink to={"/our-shop"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <FaShoppingBag /> <li> Shop</li></NavLink>
        <NavLink to={"/contact-us"} className="flex items-center text-white text-xl font-semibold gap-2 uppercase font-cinzel-c"> <MdEmail /> <li> contact</li></NavLink>

    </>
    return (
        <div className="drawer ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-[#D1A054] w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <Link to={"/"}>
                        <button className="text-left text-white font-bold md:ml-5">
                            <h4 className="md:text-2xl text-lg font-bold uppercase">Taste Haven</h4>

                            <p className="hidden md:block font-cinzel-c text-sm">R E S T A U R A N T</p>
                        </button>
                    </Link>

                </div>
                {/* Page content here */}
                <div className=" flex-none lg:flex min-h-screen">
                    <div className="bg-[#D1A054] p-4 w-80 hidden lg:block ">
                        <ul className="space-y-5 ">
                            {links}
                        </ul>
                    </div>
                    <div className="lg:flex-1 bg-slate-100 py-6 min-h-screen">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#D1A054] min-h-full w-80 p-4 space-y-5 pt-16">
                    {/* Sidebar content here */}
                    {
                        links
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;