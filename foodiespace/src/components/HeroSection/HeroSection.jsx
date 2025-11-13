import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

import gallery1 from '../../assets/images/gallery-1.jpg';
import gallery2 from '../../assets/images/gallery-2.jpg';
import gallery3 from '../../assets/images/gallery-3.jpg';

const HeroSection = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper h-150"
      >
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={gallery1} alt="Delicious Food" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={gallery2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={gallery3} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroSection;
