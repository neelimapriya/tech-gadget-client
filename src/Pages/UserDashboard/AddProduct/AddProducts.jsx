import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import  { useState } from 'react';
import ReactTags from 'react-tag-input';
import { render } from 'react-dom';


const Image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Image_hosting_Api = `https://api.imgbb.com/1/upload?key=${Image_hosting_key}`;
const AddProducts = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  // const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  // date
  const today = new Date();
  const time = today.toLocaleString();
  console.log(time);

  // tags
  // const handleDelete = (i) => {
  //   const newTags = [...tags];
  //   newTags.splice(i, 1);
  //   setTags(newTags);
  // };

  // const handleAddition = (tag) => {
  //   setTags([...tags, tag]);
  // };

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(Image_hosting_Api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const productInfo = {
        name: data.name,
        details: data.details,
        link: data.link,
        vote: parseInt(0),
        tag: data.tag,
        image: res.data.data?.display_url,
        time: res.data.data?.time,
        date: time,
        type: "regular",
        email: user?.email,
        userName: user?.displayName,
        profile: user?.photoURL,
      };
      console.log(productInfo);
      const productsAdd = await axiosSecure.post("/addProduct", productInfo);
      console.log(productsAdd.data);
      if (productsAdd.data.insertedId) {
        reset();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.name} has been posted`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="mt-10 p-5">
      <h2 className="text-3xl font-bold text-center underline">
        Add Your Products
      </h2>
      <div className="p-5 bg-gray-300 ml-5 mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              placeholder="Product name"
              {...register("name", { required: true,maxLength:100 })}
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Product link*</span>
            </label>
            <input
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
              type="text"
              placeholder="add tags"
              {...register("tag", { required: true })}
              className="input input-bordered w-full "
              required
            />
          </div>
          <div>
          {/* <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
      /> */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Products Details*</span>
            </label>
            <textarea
              {...register("details", {required:true})}
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
              value="POST"
              className="text-xl font-semibold bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
