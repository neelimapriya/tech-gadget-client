import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const QueuePage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["getQueue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getQueue");
      return res.data;
    },
  });
  console.log(products);
  const [reject, setReject] = useState(products)



  const handleMakeFeatured = (product) => {
    axiosSecure.patch(`/featured/${product._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${product.name} is featured now`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  // todo
  // handle accept delete from queue post productcollection

  const handleAccept = (product) => {
    axiosSecure.post("/acceptProduct", product);
    axiosSecure.delete(`/deleteQueue/${product?._id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          title: "Aceepted!",
          text: "Product Added.",
          icon: "success",
        });
      }
    });
  };

  // reject button
  const handleReject=(Id)=>{
    const index= products.findIndex((product) => product._id === Id)
    // // console.log(index)
    // if(index !== -1){
    //   const rejectedProduct=[...products]
    //   rejectedProduct[index]={...rejectedProduct[index], status:'Rejected'}
      setReject(index)
    // }
  }

  return (
    <div className="mt-10 p-5">
      <h2 className="text-center text-3xl font-serif text-pink-800 underline">
        Product Review Queue Page
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>details</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => (
                <tr key={product._id} className="">
                  <th>{i + 1}</th>
                  <td>{product?.name}</td>
                  <td>
                    <Link
                      className="hover:text-pink-900"
                      to={`queueDetails/${product?._id}`}
                    >
                      {" "}
                      View Details
                    </Link>
                  </td>

                  {/* make fetured */}
                  <td>
                    {product?.type === "featured" ? (
                      <span className="text-pink-800 font-semibold">
                        Featured
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeFeatured(product)}
                        className="btn  hover:bg-pink-700"
                      >
                        Make Featured
                      </button>
                    )}
                  </td>
                  {/* accept */}
                  <td>
                    <button
                   
                      onClick={() => handleAccept(product)}
                      className="btn bg-pink-900 text-white hover:text-black"
                    >
                      Accept
                    </button>
                    {/* reject */}
                    <button onClick={()=>handleReject(product._id)} disabled={i === reject}
                     className="btn bg-red-700 text-white hover:text-red-700"> reject</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueuePage;
