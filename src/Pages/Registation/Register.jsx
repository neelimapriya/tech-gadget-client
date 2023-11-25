import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Hooks/SocialLogin";

const Image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const Image_hosting_Api=`https://api.imgbb.com/1/upload?key=${Image_hosting_key}`
console.log(Image_hosting_key)
console.log(Image_hosting_Api)
const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();



  const {
    register,
    handleSubmit,
    reset ,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    console.log(data.photo[0]);
     // image upload to imgbb and then get an url
     const imageFile= {image: data?.photo[0]}
     const res=await axiosPublic.post(Image_hosting_Api, imageFile, {
         headers:{
             'Content-Type':'multipart/form-data'
         }
     })
     

     console.log(res.data)
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email,
              image:res.data?.data?.display_url
            };
            axiosPublic.post("/users", userInfo).then((res) => {
                console.log(res.data)
            if (res.data.insertedId) {
                console.log("user added to the database");
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Account created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              reset()
              navigate("/");
            }
          });
      })
      .catch((error) => console.log(error));
    });
  };

  return (
    <div>
         <div className="bg-black text-white h-56 ">
        <h2 className="pt-40 flex justify-center items-center text-4xl font-serif font-semibold">
          Create Your Account
        </h2>
      </div>
      <div className="hero   bg-gradient-to-r from-pink-800 via-pink-900 to-black pb-20">
        <div className="card  w-full  shadow-2xl max-w-sm ">
         
          <form onSubmit={handleSubmit(onSubmit)} className="card-body  bg-gradient-to-r from-red-950 via-pink-950 to-black">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-serif text-xl">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-500 drop-shadow-lg">Name is required</p>}
            </div>
            <div className="form-control">
               <label className="label">
                <span className="label-text  text-white font-serif text-xl">Upload your photo</span>
              </label>

            
               <input
              {...register("photo", {required:true})}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
              {errors.photo && (
                <p className="text-red-600">photo is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white font-serif text-xl">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white font-serif text-xl">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]){1,})/,
                })}
                name="password"
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less then 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one upper case character, one lower case
                  character and one special character.
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign Up"
                className="text-xl font-semibold bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg"
              />
            </div>
            <SocialLogin></SocialLogin>

          </form>
          <p className="text-center pb-3 text-white text-lg">
            <small>
              Already Have an account ?{" "}
              <Link className="text-yellow-600 font-bold text-lg" to="/login">
               Please Login.
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
