import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
function StoreProduct() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMargin: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="150" width="200" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="150" width="200" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="150" width="200" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="150" width="200" alt='1'/>
        </div>
        <div className="slide">
            <Image src='https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/Product-2024-1-2-22-3017.webp' height="150" width="200" alt='1'/>
        </div>
      </Slider>
    </div>
  );
}

export default StoreProduct;
