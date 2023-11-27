import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUpVote from "../../Hooks/useUpVote";
import useDownVote from "../../Hooks/useDownVote";
import WriteReview from "../Review/WriteReview";
import DisplayReview from "../Review/DisplayReview";
import Swal from "sweetalert2";

const CardDetails = () => {
  const item = useLoaderData();
  console.log(item);
  const { image, date, link, name, tag, time, type, vote, _id, details } = item;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  // console.log(email)
  const navigate = useNavigate();
  const location = useLocation();
  const [upVoteCount, , refetch] = useUpVote();
  const [downCount] = useDownVote();

  const upCount = upVoteCount?.filter((up) => up?.Id == _id);
  // console.log(upCount)
  const downvote = downCount?.filter((down) => down?.Id == _id);
  // console.log(downvote)

  // upvote button
  const handleUpvote = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
    if (user && email) {
      const upvoteInfo = {
        Id: _id,
        email: email,
      };
      axiosSecure.post("/upvote", upvoteInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("added ");

          refetch();
        }
      });
    }
  };

  // downVote button
  const handleDown = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
    if (user && email) {
      const downVote = {
        Id: _id,
        email: email,
      };
      axiosSecure.post("/down", downVote).then((res) => {
        if (res.data.insertedId) {
          console.log("added ");
          refetch();
        }
      });
    }
  };

  // report
  const handleReport = (_id) => {
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

      <div className="flex flex-col md:flex-row">
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
          <p>Vote: {upCount.length}</p>
          <div className="mt-auto flex gap-10  p-2 justify-evenly">
            <div className="">
              <button onClick={handleUpvote} className=" ">
                <FaThumbsUp className="hover:text-blue-600 text-xl "></FaThumbsUp>
              </button>
              <p>{upCount.length}</p>
            </div>

            <div>
              <button onClick={handleDown}>
                <FaThumbsDown className="hover:text-blue-600 text-xl "></FaThumbsDown>
              </button>
              <p> {downvote?.length}</p>
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
