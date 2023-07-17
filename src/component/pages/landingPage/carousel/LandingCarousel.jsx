import { Carousel, Image } from "antd";
import React, { useState } from "react";
import img1 from "./img/img-1.jpg";
import img2 from "./img/img-2.jpg";
import img3 from "./img/img-3.jpg";
import { useSelector } from "react-redux";

const LandingCarousel = () => {
  const school = useSelector((state) => state.schoolReducer.school);
  const imgList = [
    {
      id: 1,
      img: school.backGround1 || img1,
      title: "img1",
    },
    {
      id: 2,
      img: school.backGround2 || img2,
      title: "img2",
    },
    {
      id: 3,
      img: school.backGround3 || img3,
      title: "img3",
    },
  ];

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const [dotPosition, setDotPosition] = useState('bottom');
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <Carousel autoplay dotPosition={dotPosition} dots accessibility draggable>
      {imgList.map((item) => (
        <div
          className="h-[40rem] w-[100%] flex justify-center items-center"
          style={{
            backgroundImage: `url(${school.backGround2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            boxShadow: "inset 0 -60px 70px 50px rgba(0, 0, 0, 0.6)",
          }}
          key={item.id}
        >
          {/* Optional: If you want to show the image content inside the div, you can use the <Image> component */}

          <img style={{
            width: '100%',
            display: 'block',
            height: '100%',
          }} className="w-full h-full" src={item.img} alt={item.title} />

        </div>
      ))}
    </Carousel >

  );
};

export default LandingCarousel;
