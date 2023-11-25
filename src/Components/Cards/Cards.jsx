import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import useUpVote from "../../Hooks/useUpVote";
import useDownVote from "../../Hooks/useDownVote";

const Cards = ({ item }) => {
  const { image, date, link, name, tag, time, type, vote, _id } = item;
  const [button, setButton] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  // console.log(email)
  const navigate = useNavigate();
const [upVoteCount,refetch]=useUpVote()
const [downCount]=useDownVote()

const upCount=upVoteCount?.filter(up=>up?.Id == _id)
// console.log(upCount)
const downvote=downCount?.filter(down=>down?.Id == _id)
// console.log(downvote)

  // upvote button
  const handleUpvote = () => {
    if (user && email) {
      const upvoteInfo = {
        Id: _id,
        email: email,
      };
      axiosSecure.post("/upvote", upvoteInfo).then((res) => {
        if (res.data.insertedId) {
          setButton();
          console.log('added ')
          refetch()
        } 
      });
    }else {
      navigate("/login", { state: { from: location } });
    }
  };

  // downVote button
  const handleDown=()=>{
    if (user && email) {
      const downVote = {
        Id: _id,
        email: email,
      };
      axiosSecure.post("/down", downVote).then((res) => {
        if (res.data.insertedId) {
          setButton();
          console.log('added ')
          refetch()
        } else {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  }

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

          <div className="mt-auto flex gap-10  p-2 justify-evenly">
            {/* <p> Vote: {vote}</p>
            <div className="flex gap-4 justify-center items-center">
              
              
            </div> */}
            <div className="">
              <button onClick={handleUpvote}  className=" ">
                <FaThumbsUp className="hover:text-blue-600 text-xl "></FaThumbsUp>
              </button>
              <p>{upCount.length}</p>
            </div>

            <div>
              <button onClick={handleDown}><FaThumbsDown className="hover:text-blue-600 text-xl"></FaThumbsDown></button>
             <p> {downvote?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
