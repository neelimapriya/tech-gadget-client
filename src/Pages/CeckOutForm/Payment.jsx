import { loadStripe } from "@stripe/stripe-js";


import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {


     // payment key
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

    return (
        <div className="mt-10 flex justify-center flex-col items-center">
          <h2 className="text-center text-3xl font-serif font-semibold underline">
            {" "}
            Membership Subscribe
          </h2>
          <p className="text-center mt-2 font-semibold">
            If you want to add more than 1 product in{" "}
            <span className="text-lg font-semibold text-pink-700">
              Tech Gadget
            </span>
            . You have to Subscribe to Our membership.
          </p>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn w-52 mt-5 bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
           Pay- 50$
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <Elements stripe={stripePromise}>
            <div className="modal-box bg-gradient-to-r from-pink-800 to-pink-950 text-white ">
              <h3 className="font-bold text-lg">Hello!</h3>
              <CheckOutForm></CheckOutForm>
              <div className="modal-action">
                <form method="dialog">
                  
                  <button className="btn flex items-center">close</button>
                </form>
              </div>
              
            </div>
            </Elements>
          </dialog>

        </div>
    );
};

export default Payment;