"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import img from "@/assets/image/imageSlide.png";
import img1 from "@/assets/image/imageSlide1.png";
import img2 from "@/assets/image/imageSlide2.png";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function ImageBanner() {
  const images = [img, img1, img2];

  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      initialSlide={Math.floor(images.length / 2)}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 150,
        modifier: 1.2,
        slideShadows: false,
      }}
      pagination
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
