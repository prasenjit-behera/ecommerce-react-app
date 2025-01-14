import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
const ImageSlider = () => {
  const images = [
    'src/assets/sliders/slider1.jpeg',
    'src/assets/sliders/slider2.jpg',
    'src/assets/sliders/slider3.jpg',
    'src/assets/sliders/slider4.jpg',
    'src/assets/sliders/slider5.png'
  ];

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }} >
      <Swiper
        spaceBetween={10}  // Space between slides
        centeredSlides={true}
        autoplay={{        // Enable autoplay
          delay: 2500,     // Delay between transition
          disableOnInteraction: false
        }}
        pagination={{      // Pagination dots at the bottom
          clickable: true,
        }}
        navigation={false}  // Enable navigation arrows

        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
