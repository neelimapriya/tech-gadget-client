import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import MyProductCard from "./MyProductCard";

const MyProducts = () => {
    const axiosSecure =useAxiosSecure()
    const {user}=useAuth()
   
    const {data: products = [], isPending: loading}=useQuery({
        queryKey:['products', user?.email],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/userProducts?email=${user?.email}`)
            return res.data;
        }
    })
   
      console.log(products)
      
    return (
        <div className="mt-10 p-5">
            <h2 className="text-4xl text-center font-bold font-serif underline">My Products: {products?.length}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2  justify-center gap-4 ">
        {
            products?.map(product=><MyProductCard key={product._id} item={product}></MyProductCard>)
        }
      </div>
        </div>
    );
};

export default MyProducts;