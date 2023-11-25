import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  const { image, date, link, name, tag, time, type, vote, _id } = item;
  return (
    <div className="p-5 m-5 border">
      <div className="flex">
        <div className="flex flex-col">
          <div className="w-32 h-32">
            <img src={image} alt="" />
          </div>
          <h2 className="text-[9px]">Date: {date}</h2>
        </div>
        <div className="pl-2 flex flex-col ">
          <Link to={`/products/${_id}`}>
            <h2 className="text-red-700 text-xl hover:font-bold hover:cursor-pointer">
              {name}
            </h2>
          </Link>

          <p></p>
          <p className="text-base">tags: #{tag}</p>
          <div className="mt-auto flex gap-10">
            <p> Vote: {vote}</p>
            <div className="flex gap-4 justify-center items-center">
              <FaThumbsUp className="hover:text-blue-600"></FaThumbsUp>
              <FaThumbsDown className="hover:text-blue-600"></FaThumbsDown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
