import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";


const PopularProduct = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular");
      return res.data;
    },
  });
  console.log(products);

  return (
    <div className="bg-gradient-to-r from-pink-800 to-pink-950 mb-5">
      <div className="flex justify-center items-center gap-4">
      <IoStarSharp className="text-yellow-500 drop-shadow-2xl animate-pulse" size={40} />
      <h2 className="text-center text-2xl font-bold font-serif  text-white py-3 ">
        Our popular products.
      </h2>
      <IoStarSharp className="text-yellow-500 drop-shadow-2xl animate-pulse" size={40} />
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products?.map((item) => (
          <SwiperSlide className="" key={item?._id}>
            <div className="p-1 md:p-5 md:m-5 h-52 md:h-96 border shadow-md shadow-red-950 overscroll-y-auto">
              <div className="flex flex-col h-96 pb-2 text-white">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-10 h-10 md:w-32 md:h-32 lg:w-60 lg:h-60 ">
                    <img src={item?.image} className="" alt="" />
                  </div>
                </div>
                <div className="pl-2 flex flex-col justify-center items-center">
                  <Link to={`/products/${item?._id}`}>
                    <h2 className="text-white text-[9px] md:text-base hover:font-bold hover:cursor-pointer">
                      {item?.name}
                    </h2>
                  </Link>

                  <p className="text-[9px] md:text-base">tags: #{item?.tag}</p>
                  <h2 className="text-[4px] md:text-[9px]">Date: {item?.date}</h2>

                  <button className="flex flex-col md:flex-row items-center gap-2">
                    Likes:
                    <FaThumbsUp className="hover:text-blue-600 text-xl "></FaThumbsUp>
                    {item?.vote}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularProduct;
