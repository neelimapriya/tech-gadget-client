import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://i.ibb.co/VCWBQdN/Banner4.png"
            alt=""
          />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/6ty4qpN/new-laptop-balancing-with-water.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/svRY7KL/pink-headphones-wireless-digital-device.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/qyPbvm9/SL-091319-23410-15.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
