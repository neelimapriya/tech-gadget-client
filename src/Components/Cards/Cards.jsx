import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

import { useState } from "react";


const Cards = ({ item,refetch }) => {
  const { image, date, link, name, tag, time, type, vote, _id ,downVote} = item;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
 


  const [like, setLike]=useState(false)
 

  const handleUpvote=()=>{
    if (!user) {
      navigate("/login", { state: { from: location } });
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


  return (
    <div className="p-5 m-5 border shadow-md shadow-red-950">
      <div className="flex flex-col ">
        <div className="flex flex-col justify-center items-center">
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

          <div className="mt-auto flex gap-10  p-2 justify-evenly">
            <div className="">
              <button className=" ">
                {
                  like? (  <FaThumbsUp onClick={handleUpvote} className="text-blue-600 text-xl "></FaThumbsUp> ):(  <FaThumbsUp onClick={handleUpvote} className="hover:text-blue-600 text-xl "></FaThumbsUp>)
                }
              
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
        </div>
      </div>
    </div>
  );
};

export default Cards;
