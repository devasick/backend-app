// src/components/pos/POSMenu.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const POSMenu = ({ categories }) => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView="auto"
      navigation
      pagination={{ clickable: true }}
      className="pos-menu-swiper"
    >
      {categories.map((category) => (
        <SwiperSlide key={category.id} className="!w-fit">
          <a
            href="#"
            className="w-28 flex flex-col items-center text-center gap-4 py-4 px-3 rounded-lg border-b-2 border-transparent transition hover:bg-primary-light hover:border-primary bg-white"
          >
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${category.image}`}
              alt={category.name}
              className="h-7 drop-shadow-category"
            />
            <h3 className="text-xs leading-[16px] font-medium font-rubik">
              {category.name}
            </h3>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default POSMenu;
