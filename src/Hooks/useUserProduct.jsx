import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserProduct = () => {
    const axiosSecure =useAxiosSecure()
    const {user}=useAuth()
   
    const {data: products = [], isPending: loading, refetch}=useQuery({
        queryKey:['products', user?.email],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/userProducts?email=${user?.email}`)
            return res.data;
        }
    })
   
    return [products,loading, refetch]
};

export default useUserProduct;