import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useFetchGetCarts from "../../../API/useFetchGetCarts";
import useAuthContext from "../../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const { data: cart } = useFetchGetCarts();


    const [err, setErr] = useState();
    const axios = useAxios()
    const { data } = useFetchGetCarts();
    const { user } = useAuthContext();
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate()


    const totalPrice = data?.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice) {
            axios.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axios, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true)
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErr(error.message)
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErr("")
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || "unknown",
                    name: user.displayName || "unknown"
                }
            }
        })
        if (confirmError) {
            setIsLoading(false)
            console.log("Confirm Err");
        }
        else {
            console.log("Confirm", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setIsLoading(false)
                const payment = {
                    transactionId: paymentIntent.id,
                    email: user.email,
                    price: totalPrice,
                    date: new Date(),
                    itemIds: cart.map(item => item.itemId),
                    dbIds: cart.map(item => item._id),
                    status: "pending"
                }
                const res = await axios.post("/payment", payment);
                console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Done",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        navigate("/dashboard/payment-history")
                    })
                }
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border p-2 w-4/5 mx-auto"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',

                        },
                    },
                }}
            />
            <div className=" text-center">
                <button disabled={isLoading || !stripe || !elements} type="submit" className=" btn mt-8 bg-[#D1A054] text-white w-48">
                    Pay
                </button>
                <p className="text-red-500 mt-2">{err}</p>
            </div>
        </form>
    );
};

export default CheckoutForm;