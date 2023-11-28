import useVerified from "../../Hooks/useVerified";

const VarifiedUser = () => {
  const [verified, , refetch] = useVerified();
  console.log(verified);
  return (
    <div className="mt-10 pl-2 text-center ">
      <h2 className="text-4xl font-serif font-semibold mb-10 underline">Our Verified user:({verified?.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       {
        verified?.map(user=><div className="w-52 bg-pink-900 card " key={user._id}>
           <div  className="card-body p-2 text-slate-300">
           <h2 className="text-sm">Email: <span className="text-green-500">{user?.email}</span></h2>
           <h2 className="text-sm underline">Transaction Id</h2>
            <p className="text-xs text-green-500">{user?.transactionId}</p>
            <p className="text-lg">Amount: <span className="text-green-500 font-semibold">{user?.money}$</span></p>
            < p className="text-[10px]">Date: <span className="text-green-500"> {user?.date}</span></p>
           </div>
        </div>)
       }
      </div>
      <div className="overflow-x-auto"></div>
    </div>
  );
};

export default VarifiedUser;
