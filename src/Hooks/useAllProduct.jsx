// import { HashLoader } from "react-spinners";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useEffect, useState } from "react";

const useAllProduct = (search, productPerPAge, currentPage) => {

  const [loading, setLoading] = useState(true); 
  const axiosPublic = useAxiosPublic();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosPublic(
      `/product?search=${search}&page=${currentPage}&size=${productPerPAge}`
    ).then((res) =>{
    setLoading(false)
    setProducts(res.data)});
   
  }, [search, axiosPublic, productPerPAge, currentPage]);

  return [products,loading];
};

export default useAllProduct;
