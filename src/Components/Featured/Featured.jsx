import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Cards from "../Cards/Cards";

const Featured = () => {
    const axiosPublic=useAxiosPublic()
    const {
        data: products = [],
        isPending: loading,
        refetch
       
      } = useQuery({
        queryKey: ["featured"],
        queryFn: async () => {
          const res = await axiosPublic.get("/featured");
          return res.data;
        },
      });
      console.log(products);
    return (
        <div>
           <div className="bg-black text-white  ">
        <h2 className="pt-10 flex justify-center items-center text-2xl md:text-4xl font-serif font-semibold text-red-700">
          Welcome to Tech Gadget! 👋
        </h2>
        <p className="flex justify-center items-center text-[9px] md:text-xl pb-10">
          The place to launch and discover new tech products.{" "}
          <span className="text-yellow-600 pl-2"> Take a tour.</span>
        </p>
      </div>
            <div className="bg-gradient-to-r from-pink-800 to-pink-950
             mb-5 text-white  ">
        <h2 className="py-4 flex justify-center items-center text-center text-2xl md:text-4xl font-serif font-semibold text-white animate-pulse">
          Here is our featured products! 
        </h2>
        
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3  justify-center gap-4">
        {
            products?.map(product=><Cards key={product._id} item={product} refetch={refetch}></Cards>)
        }
      </div>
        </div>
    );
};

export default Featured;