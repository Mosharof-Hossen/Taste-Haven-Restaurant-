import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import {
    Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Reservation = () => {

    return (
        <div>
            <SectionTitle heading={"payment"} subHeading={"Ready?"}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Reservation;