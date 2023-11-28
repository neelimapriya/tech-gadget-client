const CouponPage = () => {
  return (
    <div className="bg-gradient-to-r from-pink-800 to-pink-950 text-white  flex flex-col md:flex-row pt-10 px-5 pb-10">
     <div>
      <h2 className="text-3xl font-bold text-center mt-5 font-serif">Use our coupon code to get 20$ of when purchase membership</h2>
    <div className="flex rounded-lg justify-center items-center mt-3 text-center gap-2 ">
    <p className="text-center text-lg">Use Promo Code </p>
    <p className="text-2xl font-bold bg-gradient-to-r from-green-700 to-yellow-500 p-2 rounded-lg animate-pulse">TG20</p>
    </div>
     </div>
      <div>
        <img className=" animate-pulse" src="https://i.ibb.co/gr8Mbvb/img-2.png" alt="" />
      </div>
    </div>
  );
};

export default CouponPage;
