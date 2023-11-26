import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const today = new Date();
    const time = today.toLocaleString();
  return (
    <div className="my-10 p-5">
      <h2 className="text-center text-4xl font-serif font-bold underline mb-1">
        MY HOME
      </h2>
      <p className="text-center">{time}</p>
      <div className="flex flex-col md:flex-row">
        <div className="w-32 h-32">
          <img src={user?.photoURL} alt="" />
        </div>
        <div className=" space-y-1">
          <h2 className="text-xl font-semibold text-pink-900">Name: {user?.displayName}</h2>
          <p><span className="font-semibold">Email:</span> {user?.email}</p>
          <p><span className="font-semibold">Profile Created: </span>{user?.metadata?.creationTime}</p>
          <p><span className="font-semibold">Last Login: </span> {user?.metadata?.lastSignInTime}</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
