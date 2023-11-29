// import { HashLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useEffect, useState } from "react";

const useAllProduct = (search, productPerPAge, currentPage) => {

  // const [loading, setLoading] = useState(true); 
  const axiosPublic = useAxiosPublic();
const [newSearch,setNewSearch]=useState(search)
const [perPage, setPerPage]=useState(productPerPAge)
const [currentPageValu, setCurrentPageValue]=useState(currentPage)
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   axiosPublic(
  //     `/product?search=${search}&page=${currentPage}&size=${productPerPAge}`
  //   ).then((res) =>{
  //   setLoading(false)
  //   setProducts(res.data)});
   
  // }, [search, axiosPublic, productPerPAge, currentPage]);

  console.log(newSearch)
  console.log(perPage)
  console.log(currentPageValu)

  const { data: products = [], isPending: loading,refetch} = useQuery({
    queryKey:['products',newSearch,perPage,currentPageValu],
    queryFn:async()=>{
      const res=await axiosPublic.get( `/product?search=${newSearch}&page=${currentPage}&size=${productPerPAge}`);
      return res.data
      
    }
    
  });
  console.log(products)
  return [products,loading,refetch, setNewSearch,setPerPage,setCurrentPageValue,newSearch,perPage,currentPageValu];
};

export default useAllProduct;
