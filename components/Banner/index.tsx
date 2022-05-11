import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Banner
 * @return {JSX.Element} The JSX Code for the Banner
 */
const data = [
  { id: 1, thumbUrl: "/images/banner.png" },
  { id: 2, thumbUrl: "/images/banner2.png" },
];
const Banner = () => {
  return (
    <>
      <Swiper
        id="swiper-banner"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {data.map((x) => (
          <SwiperSlide key={x.id}>
            <Image
              src={x.thumbUrl}
              width={1920}
              height={480}
              layout="responsive"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
