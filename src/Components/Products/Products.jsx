import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Cards from "../Cards/Cards";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
  });
  console.log(products);
  return (
    <div>
      <div className="bg-black text-white h-56 ">
        <h2 className="pt-32 flex justify-center items-center text-2xl md:text-4xl font-serif font-semibold text-red-700">
          Welcome to Tech Gadget! 👋
        </h2>
        <p className="flex justify-center items-center mb-8 text-[9px] md:text-xl ">The place to launch and discover new tech products. <span className="text-yellow-600 pl-2"> Take a tour.</span></p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  justify-center gap-4">
        {
            products?.map(product=><Cards key={product._id} item={product}></Cards>)
        }
      </div>
    </div>
  );
};

export default Products;
