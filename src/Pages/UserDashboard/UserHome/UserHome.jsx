import { loadStripe } from "@stripe/stripe-js";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import useModaretor from "../../../Hooks/useModaretor";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../CeckOutForm/CheckOutForm";

const UserHome = () => {
  const [isAdmin] = useAdmin();
  const [isModaretor] = useModaretor();
  const { user } = useAuth();
  const today = new Date();
  const time = today.toLocaleString();

  // payment key
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

  return (
    <div className="my-10 p-5 ">
      <h2 className="text-center text-4xl font-serif font-bold underline mb-1">
        MY HOME
      </h2>
      <p className="text-center">{time}</p>
      <div className="flex flex-col md:flex-row justify-center mt-10 gap-3">
        <div className="w-32 h-32">
          <img src={user?.photoURL} alt="" />
        </div>
        <div className=" space-y-1">
          <h2 className="text-xl font-semibold text-pink-900">
            Name: {user?.displayName}
          </h2>
          <h2 className="text-2xl font-semibold underline">
            {isAdmin ? "ADMIN" : isModaretor ? "MODARETOR" : ""}
          </h2>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Profile Created: </span>
            {user?.metadata?.creationTime}
          </p>
          <p>
            <span className="font-semibold">Last Login: </span>{" "}
            {user?.metadata?.lastSignInTime}
          </p>
        </div>
      </div>
      {/* payment */}
      {!isAdmin && !isModaretor ? (
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
           Pay- 200$
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
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn flex items-center">close</button>
                </form>
              </div>
            </div>
            </Elements>
          </dialog>

        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default UserHome;
