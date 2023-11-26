import { FaPenAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyProductCard = ({ item, refetch }) => {
  const { image, date,  name, tag, _id } = item;

  const axiosSecure =useAxiosSecure()
  const handleDelete = (id) => {
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
        axiosSecure.delete(`/deleteProduct/${id}`).then((res) => {
          // console.log(res.data)
          if (res.data.deletedCount > 0) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: `${name} deleted`,
              icon: "success",
            });
           
          }
        });
      }
    });
  };
  return (
    <div className="p-5 m-5 border">
      <div className="flex">
        <div className="flex flex-col">
          <div className="w-32 h-32 hover:w-36">
            <img src={image} className="" alt="" />
          </div>
        </div>
        <div className="pl-2 flex flex-col ">
          <Link to={`/products/${_id}`}>
            <h2 className="text-red-700 text-xl hover:font-bold hover:cursor-pointer">
              {name}
            </h2>
          </Link>

          <p></p>
          <p className="text-base">tags: #{tag}</p>
          <h2 className="text-[9px]">Date: {date}</h2>
          <div className="flex gap-5 flex-col md:flex-row mt-auto justify-center">
            <Link to={`updateProduct/${_id}`}>
              <div className="flex justify-center items-center hover:underline gap-1">
                <h3 className="font-semibold">Update</h3>
                <FaPenAlt className="text-blue-700"></FaPenAlt>
              </div>
            </Link>
            <div onClick={() => handleDelete(_id)} className="flex  justify-center items-center gap-1 hover:cursor-pointer">
              <h3 className="font-semibold">Delete</h3>
              <FaTrash className="text-red-700"></FaTrash>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;
