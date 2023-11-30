import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Alluser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getUser");
      return res.data;
    },
  });
//   console.log(users);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/user/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${user.name} is an admin now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleMakeModaretor = (user) => {
    axiosSecure.patch(`/user/modaretor/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${user.name} is Modaretor now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/user/${user?._id}`).then((res) => {
          // console.log(res.data)
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "This Person is deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="mt-10 ">
      <div className="flex flex-col text-center justify-evenly my-4 p-5">
        <h2 className="text-3xl font-serif uppercase underline text-pink-800">
          All users of tech gadget
        </h2>
        <h2 className="text-xl ">Total Users : ({users.length})</h2>
      </div>
      <div className="flex overflow-x-auto  scroll-pl-6 snap-x">
        <table className="table overflow-x-scroll snap-start ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user.role === "admin" ? (
                     <span className="text-green-700 font-semibold text-center">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className=" flex justify-center bg-white rounded  text-xs text-green-700 "
                    >
                      <FaUser className="text-pink-700"></FaUser>Make Admin
                    </button>
                  )}
                  {user.role === "modaretor" ? (
                    <span className="text-yellow-600 font-semibold text-center">Modaretor</span>
                  ) : (
                    <button
                      onClick={() => handleMakeModaretor(user)}
                      className="flex justify-center bg-white rounded  text-xs mt-2  text-yellow-700"
                    >
                      <FaUser className="text-pink-700"></FaUser>Make Modaretor
                    </button>
                  )}
                </td>
                
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost text-xl text-red-600"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alluser;
