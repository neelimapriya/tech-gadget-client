import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import useModaretor from "../../../Hooks/useModaretor";

import Payment from "../../CeckOutForm/Payment";

const UserHome = () => {
  const [isAdmin] = useAdmin();
  const [isModaretor] = useModaretor();
  const { user } = useAuth();
  const today = new Date();
  const time = today.toLocaleString();

 
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
       <Payment></Payment>
      ) : (
        " "
      )}
    </div>
  );
};

export default UserHome;
