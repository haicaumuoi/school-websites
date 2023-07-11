import { Carousel, Image } from "antd";
import React from "react";
import img1 from "./img/img-1.jpg";
import img2 from "./img/img-2.jpg";
import img3 from "./img/img-3.jpg";

const LandingCarousel = () => {
  const imgList = [
    {
      id: 1,
      img: img1,
      title: "img1",
    },
    {
      id: 2,
      img: img2,
      title: "img2",
    },
    {
      id: 3,
      img: img3,
      title: "img3",
    },
  ];

  return (
    <Carousel
      className="h-[40rem] relative"
      accessibility
      autoplay
      infinite
      adaptiveHeight
      draggable
    >
      {imgList.map((item) => (
        <div
          className="h-[40rem] flex justify-center items-center bg-cover bg-no-repeat shadow-inner"
          style={{
            boxShadow: "inset 0 -60px 70px 50px rgba(0, 0, 0, 0.6)",
          }}
          key={item.id}
        >
          <Image
            className=" bg-cover bg-no-repeat"
            src={item.img}
            alt={item.title}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default LandingCarousel;
