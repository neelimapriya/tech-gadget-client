import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Image_hosting_Api = `https://api.imgbb.com/1/upload?key=${Image_hosting_key}`;
const UpdateProducts = () => {
  const item = useLoaderData();
  const { image, date, link, name, tag, time, type, vote, _id, details } = item;
  // console.log(data)

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(Image_hosting_Api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      //send update item
      const updateInfo = {
        name: data.name,
        link: data.link,
        tag: data.tag,
        details: data.details,

        image: res.data.data.display_url,
      };
      const updateItem = await axiosSecure.patch(`/userProducts/${_id}`, updateInfo);
      console.log(updateItem.data);
      if (updateItem.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.name} is updated. `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="mt-10">
      <h2 className="text-center text-3xl font-bold font-serif underline">
        Update Your Product
      </h2>
      <div className="p-5 bg-gray-300 ml-5 mb-10">
        <div className="w-52 mx-auto">
          <img src={image} alt="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              defaultValue={name}
              type="text"
              placeholder="Product name"
              {...register("name", { required: true, maxLength: 100 })}
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product link*</span>
            </label>
            <input
              defaultValue={link}
              type="text"
              placeholder="Product link"
              {...register("link", { required: true })}
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Add tags*</span>
            </label>
            <input
              defaultValue={tag}
              type="text"
              placeholder="add tags"
              {...register("tag", { required: true })}
              className="input input-bordered w-full "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Products Details*</span>
            </label>
            <textarea
              defaultValue={details}
              {...register("details", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="products details"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="UPDATE"
              className="text-xl font-semibold bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
