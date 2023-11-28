
import MyProductCard from "./MyProductCard";
import useUserProduct from "../../../Hooks/useUserProduct";

const MyProducts = () => {
    const [products,loading, refetch]=useUserProduct()
      console.log(products)
      
    return (
        <div className="mt-10 p-5">
            <h2 className="text-4xl text-center font-bold font-serif underline">My Products: {products?.length}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2  justify-center gap-4 ">
        {
            products?.map(product=><MyProductCard key={product._id} item={product} refetch={refetch}></MyProductCard>)
        }
      </div>
        </div>
    );
};

export default MyProducts;