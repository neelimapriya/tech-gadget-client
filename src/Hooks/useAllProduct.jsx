// import { HashLoader } from "react-spinners";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useEffect, useState } from "react";

const useAllProduct = (search, productPerPAge, currentPage) => {
  const axiosPublic = useAxiosPublic();
  // const { loading } = useAuth();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosPublic(
      `/product?search=${search}&page=${currentPage}&size=${productPerPAge}`
    ).then((res) =>
    
    setProducts(res.data));
  }, [search, axiosPublic, productPerPAge, currentPage]);

  return products;
};

export default useAllProduct;
