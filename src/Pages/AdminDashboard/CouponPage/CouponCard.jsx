import { FaPen } from "react-icons/fa";
import useCoupon from "../../../Hooks/useCoupon";
import { Link } from "react-router-dom";

const CouponCard = () => {
  const [coupon] = useCoupon();
  console.log(coupon);

  


  return (
    <div className="mt-10 shadow-2xl bg-gradient-to-r from-pink-800 to-pink-950 text-white  border-pink-800 border-4 mx-auto w-52 md:w-72">
        <h2 className="text-3xl font-serif text-center underline">Coupon Card</h2>
      {coupon.map((value) => (
        <div className="  p-4  " key={value?._id}>
          <h2>Coupon Code: <span className="font-bold text-lg">{value?.Code}</span></h2>
          <p>Amount: <span className="font-bold text-lg">{value?.Amount}</span></p>
          <p>Description: <span className="font-bold text-lg">{value?.description}</span></p>
          <Link to={`/dashboard/updateCoupon/${value?._id}`}>
          <button  className="btn flex "><FaPen></FaPen> <span>Update Coupon</span></button>
          </Link>
          
        </div>
      ))}
    </div>
  );
};

export default CouponCard;
