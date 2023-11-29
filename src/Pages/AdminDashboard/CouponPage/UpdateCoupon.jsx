import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateCoupon = () => {
  const data = useLoaderData({});
  console.log(data)
  const axiosSecure=useAxiosSecure()
  const { Amount, Code, description, _id } = data;

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log('form')
    const form =e.target;
    const amount =form.amount.value;
    const code =form.code.value;
    const description=form.text.value;
    console.log(amount,code,description)

    const formInfo={
        Amount:amount,
        Code:code,
        description:description
    }
   const info= await axiosSecure.patch(`/updateCoupon/${_id}`,formInfo)
   console.log(info.data)
    
        
        if(info.data.modifiedCount >0){
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Coupon is updated. `,
                showConfirmButton: false,
                timer: 1500,
              });
              form.reset()
        }
    

  }
// updateCoupon
  return (
    <div className="m-10 ">
      <h2 className="text-center text-3xl font-serif font-semibold underline mb-5">
        Update Coupon
      </h2>
      <form onSubmit={handleSubmit} className=" w-96 mx-auto space-y-3 bg-gray-400 rounded-lg   p-4">
        <div>
          <label className="text-center font-serif text-pink-800 font-semibold">
            Coupon Code
          </label>
          <input
          defaultValue={Code}
            type="text"
            name="code"
            placeholder="code"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div>
          <label className="text-center font-serif text-pink-800 font-semibold">
            Discounted Amount
          </label>
          <input
          defaultValue={Amount}
            type="text"
            name="amount"
            placeholder="amount"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div>
          <label className="text-center font-serif text-pink-800 font-semibold">
            Description
          </label>
          <textarea
          defaultValue={description}
            type="text"
            name="text"
            placeholder="description"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="flex justify-center items-center">
          <input
            className="btn bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg w-1/2 mx-auto"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCoupon;
