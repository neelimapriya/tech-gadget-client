import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";

// trending
const Trending = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isPending: loading, refetch } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trending?sort=asc`);
      return res.data;
    },
  });
  console.log(products);
  return (
    <div>
      <div className="bg-gradient-to-r from-pink-800 to-pink-950
              text-white ">
        <h2 className="py-5 flex justify-center items-center text-center text-2xl md:text-4xl font-serif font-semibold animate-pulse">
        Our Trending products!
        </h2>
       
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3  justify-center gap-4">
        {products?.map((product) => (
          <Cards key={product._id} item={product}refetch={refetch}></Cards>
        ))}
      </div>
      <div className="my-4 flex justify-center items-center">
      <Link to="/products" className="text-center btn text-xl font-semibold bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500  rounded-lg">VIEW ALL PRODUCTS</Link>
      </div>
    </div>
  );
};

export default Trending;
