import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const CardDetails = () => {
  const item = useLoaderData();
  console.log(item);
  const { image, date, link, name, tag, time, type, vote, _id,details } = item;
  return (
    <div className="">
      <div className="bg-black text-white h-72 pb-5 px-4">
        <h2 className="pt-40 flex justify-center items-center text-sm md:text-2xl font-serif font-semibold text-center">
          Details About - <span className="text-red-700">{name}</span>
        </h2>
        <p className="text-center text-xs md:text-xl">Here you can vote, write review and report! </p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
            <img src={image} alt="" />
        </div>
        <div className="md:w-1/2 md:pt-5 text-center space-y-3 mb-4">
            <h2 className="text-2xl text-red-700 font-semibold text-center">Product Name: {name}</h2>
            <p>Uploaded Date: {date}</p>
            <p className="mt-3 text-center mb-1">Description: {details}</p>

            <p className="underline hover:text-violet-600 text-xl font-semibold"><a href={link}>View This Product</a></p>
            <p>tags: #{tag}</p>
            <p>Vote: {vote}</p>
            <div className="flex gap-12 justify-center items-center pt-3 ">
              <FaThumbsUp className="hover:text-blue-600 text-2xl"></FaThumbsUp>
              <FaThumbsDown className="hover:text-blue-600 text-2xl"></FaThumbsDown>
            </div>
            <p className="text-red-700 my-5"> Report this product</p>

        </div>
      </div>
    </div>
  );
};

export default CardDetails;
