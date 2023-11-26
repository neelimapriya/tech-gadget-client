import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";

import '@smastrom/react-rating/style.css'





const DisplayReview = ({Id}) => {
    const axiosPublic=useAxiosPublic()
    const [data,setData]=useState([])
    useEffect(() => {
        axiosPublic.get(`/reviewItem/${Id}`)
          
          .then((res) => setData(res.data));
      }, [Id,axiosPublic]);
    console.log(data)
    return (
        <div>
           <div className="bg-black pt-10 pb-5">
            <h2 className="text-2xl font-bold font-serif text-red-700 text-center animate-pulse">Reviews of this Products</h2>
            </div>

            <div>
            <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper pt-10 mb-20 bg-slate-300"
      >
        {
            data?.map(item=><SwiperSlide key={item._id}>
                 <div className="px-20 flex flex-col items-center space-y-3">
                 <h3 className="text-2xl text-orange-400 text-center">
                {item.name}
              </h3>
              <img className="h-10 w-10 rounded-full" src={item?.photo} alt="" />
              
              <p className="text-center text">{item.text}</p>
              
             
              <Rating style={{ maxWidth: 100 }} value={item.rating} readOnly />
              <p className="text-sm pb-5">{item?.time}</p>
              
            </div>
            </SwiperSlide>)
        }
        
        
      </Swiper>
            </div>
        </div>
    );
};

export default DisplayReview;