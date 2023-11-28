import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState();
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate=useNavigate()

  const money = parseInt(50);
  // console.log(money)
  useEffect(() => {
    if (money > 0) {
      axiosSecure.post("/create-payment-intent", { money }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, money]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !element) {
      return;
    }
    const card = element.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError(" ");
    }
    // confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "unknown",
          },
        },
      });
    if (paymentError) {
      console.log("payment error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // send payment info to database
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          money,
          date: new Date(),
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("saved database success", res);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Thanks for Subscribe",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/dashboard/userHome')
        }
      }
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#848ee0",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex flex-col items-center justify-center mt-3 ">
        <button className="btn mt-2 bg-blue-700 text-white w-32 hover:bg-green-700">
          Pay
        </button>
        <p className="text-white text-center bg-red-800">{error}</p>
        {transactionId && (
          <p className="text-green-700 bg-white">
            Your transaction Id: {transactionId}
          </p>
        )}
      </div>
    </form>
  );
};

export default CheckOutForm;
