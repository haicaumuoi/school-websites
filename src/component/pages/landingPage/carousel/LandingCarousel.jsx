import { Button, Carousel, Image } from "antd";
import React from "react";
import img1 from "./img/img-1.jpg";
import img2 from "./img/img-2.jpg";
import img3 from "./img/img-3.jpg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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

  const prevButton = <Button shape="circle" icon={<LeftOutlined />} />;
  const nextButton = <Button shape="circle" icon={<RightOutlined />} />;

  return (
    <Carousel
      className="h-[40rem]"
      accessibility
      autoplay
      infinite
      adaptiveHeight
      arrows
      draggable
      prevArrow={prevButton}
      nextArrow={nextButton}
    >
      {imgList.map((item) => (
        <div
          className="h-[40rem] flex justify-center items-center bg-cover bg-no-repeat shadow-inner"
          style={{
            boxShadow: "inset 0 -60px 70px 50px rgba(0, 0, 0, 0.6)",
          }}
          key={item.id}
        >
          <img
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
