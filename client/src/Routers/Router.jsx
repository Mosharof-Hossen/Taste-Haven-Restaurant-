import {
    createBrowserRouter,

} from "react-router-dom";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import OurMenu from "../Pages/OurMenu/OurMenu";
import OurShop from "../Pages/OurShop/OurShop";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Carts from "../Pages/Carts/Carts";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AddReview from "../Pages/Dashboard/AddReview/AddReview";
import MyBooking from "../Pages/Dashboard/MyBooking/MyBooking";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/our-menu",
                element: <OurMenu></OurMenu>
            },
            {
                path: "/our-shop",
                element: <OurShop></OurShop>
            },
            {
                path: "/contact-us",
                element: <ContactUs></ContactUs>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <UserProfile></UserProfile>
            },
            {
                path: "/dashboard/carts",
                element: <Carts></Carts>
            },
            {
                path: "/dashboard/reservation",
                element: <Reservation></Reservation>
            },
            {
                path: "payment-history",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "add-review",
                element: <AddReview></AddReview>
            },
            {
                path: "my-booking",
                element: <MyBooking></MyBooking>
            }

        ]
    }
])

export default router;