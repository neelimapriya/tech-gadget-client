import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const ReportedPage = () => {
    const axiosSecure=useAxiosSecure()
    const { data: products = [], isPending: loading, refetch} = useQuery({
        queryKey:['products'],
        queryFn:async()=>{
          const res=await axiosSecure.get('/reported');
          return res.data
        }
      });
      console.log(products)

    //   todo delete
      const handleDelete=(product)=>{
        console.log('/deleteProduct/:id',product)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/deleteProduct/${product?._id}`).then((res) => {
                // console.log(res.data)
                if (res.data.deletedCount > 0) {
                  refetch()
                  Swal.fire({
                    title: "Deleted!",
                    text: `${product?.name} deleted`,
                    icon: "success",
                  });
                 
                }
              });
            }
          });
      }

      return (
        <div className="mt-10 p-5">
            <h2 className="text-2xl font-semibold text-pink-800 font-serif text-center underline">ALL REPORTED PRODUCTS: {products?.length} </h2>
            <div>
            <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>details</th>
                <th>Type</th>
                
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => (
                <tr key={product._id} className="">
                  <th>{i + 1}</th>
                  <td className="text-red-700">{product?.name}</td>
                  <td>
                    <Link
                      className="btn hover:bg-pink-800"
                      to={`/products/${product?._id}`}
                    >
                      {" "}
                      View Details
                    </Link>
                  </td>

                  {/* delete */}
                  <td>
                   <FaTrash onClick={()=>handleDelete(product)} className="text-xl text-red-700 hover:text-2xl"></FaTrash>
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
            </div>
        </div>
      );
    
};

export default ReportedPage;