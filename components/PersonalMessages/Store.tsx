import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";

function Store() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    beforeChange: function(currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function(currentSlide) {
      console.log("after change", currentSlide);
    }
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="200" width="250" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="200" width="250" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="200" width="250" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="200" width="250" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="200" width="250" alt='1'/>
        </div>
      </Slider>
    </div>
  );
}

export default Store;
