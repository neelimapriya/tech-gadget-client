import { loadStripe } from "@stripe/stripe-js";


import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useState } from "react";
import Swal from "sweetalert2";
import useVerified from "../../Hooks/useVerified";
import useAuth from "../../Hooks/useAuth";
import useCoupon from "../../Hooks/useCoupon";

const Payment = () => {

    const [Verified, loading, refetch]=useVerified()
    const {user}=useAuth()
    const [coupon]=useCoupon()
    console.log(coupon)
    const [money, setMoney]=useState(50)

    const verifiedUser= Verified?.filter(item=>item.email === user.email)
    console.log(verifiedUser)

    const discount=coupon[0]?.Amount;
    const code=coupon[0]?.Code;


     // payment key
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

//   let money =parseInt(50)

  const handleCoupon=(e)=>{
    e.preventDefault()
   
   const form=e.target;
    const coupon =form .coupon.value;
    console.log(coupon)
    if(coupon === code){
       const value = (money -discount)
       setMoney(value)
       Swal.fire({
        position: "top",
    icon: "success",
    title: "Coupon added",
    showConfirmButton: false,
    timer: 1500,
    })
    }

    form.reset()
  }

  
    return (
        <div className="mt-20 flex justify-center flex-col items-center">
          <h2 className="text-center text-xl md:text-3xl font-serif font-semibold underline">
            {" "}
            Membership Subscribe
          </h2>
          <p className="text-center text-sm md:text-lg mt-2 md:font-semibold">
            If you want to add more than 1 product in{" "}
            <span className="md:text-xl md:font-semibold text-pink-700">
              Tech Gadget
            </span>
            . You have to Subscribe to Our membership.
          </p>

        

         {verifiedUser.length === 0 && <form className="my-5" onSubmit={handleCoupon}>
                <input type="text" className="p-2 text-black" placeholder="COUPON" name="coupon" />
                <input type="submit" disabled={money === 30} className="bg-green-700 p-2 rounded-lg btn" />
            </form>}

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button disabled={verifiedUser.length>0}
            className="btn w-52 mt-5 bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
           Subscribe- {money}$
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <Elements stripe={stripePromise}>
            <div className="modal-box bg-gradient-to-r from-pink-800 to-pink-950 text-white ">
              <h3 className="font-bold text-lg">Please pay : {money}$</h3>
              <CheckOutForm money={money} ></CheckOutForm>
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