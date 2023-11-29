import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import WriteReview from "../Review/WriteReview";
import DisplayReview from "../Review/DisplayReview";
import Swal from "sweetalert2";
import { useState } from "react";
import useAllProduct from "../../Hooks/useAllProduct";

const CardDetails = () => {
  const item = useLoaderData();
  console.log(item);
  const { image, date, link, name, tag, time, type, vote, _id, details,downVote } = item;
const [, , refetch]=useAllProduct()
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [like, setLike]=useState(false)
  // const [count, setCount]=useState(vote)

  const handleUpvote=()=>{
    if(!user){
      navigate('/login')
    }
    let newVote = vote
    if(!like){
      setLike(true)
    newVote++
    axiosSecure.patch(`/upvote/${_id}`, {vote:newVote}).then(res=>{
      console.log(res.data)
      refetch()
    })
    }else{
      setLike(false)
      newVote --
      axiosSecure.patch(`/upvote/${_id}`, {vote:newVote}).then(res=>{
        console.log(res.data)
        refetch()
      })
    }
    
    
  }

  // downVote button
  const [disLike, setDisLike]=useState(false)

  const handleDown=()=>{
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
    let newVote = downVote? downVote :0
    if(!disLike){
      setDisLike(true)
    newVote++
    axiosSecure.patch(`/downvote/${_id}`, {downVote:newVote}).then(res=>{
      console.log(res.data)
      refetch()
    })
    }else{
      setDisLike(false)
      newVote--
      axiosSecure.patch(`/downvote/${_id}`, {downVote:newVote}).then(res=>{
        console.log(res.data)
        refetch()
      })
    }
  }

  // report
  const handleReport = (_id) => {
    if(!user){
      navigate('/login')
      return
    }
    axiosSecure.patch(`/report/${_id}`).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top",
          icon:"warning",
          title: "Successfully reported",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };
  return (
    <div className="">
      <div className="bg-black text-white h-72 pb-5 px-4">
        <h2 className="pt-40 flex justify-center items-center text-sm md:text-2xl font-serif font-semibold text-center">
          Details About - <span className="text-red-700">{name}</span>
        </h2>
        <p className="text-center text-xs md:text-xl">
          Here you can vote, write review and report!{" "}
        </p>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/2">
          <img src={image} alt="" />
        </div>
        <div className="md:w-1/2 md:pt-5 text-center space-y-3 mb-4">
          <h2 className="text-2xl text-red-700 font-semibold text-center">
            Product Name: {name}
          </h2>
          <p>Uploaded Date: {date}</p>
          <p className="mt-3 text-center mb-1">Description: {details}</p>

          <p className="underline hover:text-violet-600 text-xl font-semibold">
            <a href={link}>View This Product</a>
          </p>
          <p>tags: #{tag}</p>
          <p>Vote: {vote}</p>
          <div className="mt-auto flex gap-10  p-2 justify-evenly">
            <div className="">
              <button onClick={handleUpvote} className=" ">
                <FaThumbsUp className="hover:text-blue-600 text-xl "></FaThumbsUp>
              </button>
              <p>{vote}</p>
            </div>

            <div>
              <button onClick={handleDown}>
                <FaThumbsDown className="hover:text-blue-600 text-xl "></FaThumbsDown>
              </button>
              <p> {downVote}</p>
            </div>
          </div>
          <button
            onClick={() => handleReport(_id)}
            className="text-red-600  font-semibold my-5 btn "
          >
            {" "}
            Report this product
          </button>
        </div>
      </div>
      <WriteReview Id={_id}></WriteReview>
      <DisplayReview Id={_id}></DisplayReview>
    </div>
  );
};

export default CardDetails;
