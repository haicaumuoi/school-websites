import { grey, yellow } from "@ant-design/colors";
import { Space, Typography, theme } from "antd";
import React, { useRef } from "react";
import { news } from "./newsConst";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const { Text, Title } = Typography;

const LandingNews = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const swipeableViewsRef = useRef(null);

  const itemsPerSlide = 4;

  const renderCarouselItems = () => {
    const totalItems = news.length;
    const totalSlides = Math.ceil(totalItems / itemsPerSlide);
    const carouselItems = [];

    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * itemsPerSlide;
      const endIndex = startIndex + itemsPerSlide;
      const slideItems = news.slice(startIndex, endIndex);

      const slide = (
        <div className="carousel-slide flex" key={i}>
          {slideItems.map((item) => (
            <div className="carousel-item flex-shrink-0 w-1/4" key={item.id}>
              <a href="#">
                <div className="carousel-item-content flex flex-col mx-4">
                  <img
                    className="carousel-image w-full h-48 object-cover"
                    src={item.img}
                    alt={item.title}
                  />
                  <h3 className="carousel-title text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="carousel-description">{item.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      );

      carouselItems.push(slide);
    }

    return carouselItems;
  };

  const handleNextSlide = () => {
    if (swipeableViewsRef.current) {
      swipeableViewsRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swipeableViewsRef.current) {
      swipeableViewsRef.current.slidePrev();
    }
  };

  const { useToken } = theme;
  const { token } = useToken();

  return (
    <>
      <Space className="flex flex-col items-center mx-64 mt-10">
        <Title level={4} color={grey.primary} className="uppercase">
          News & Events
        </Title>
        <Title>One91 Stories</Title>
        <Space
          style={{
            backgroundColor: token.colorPrimaryBg,
          }}
          className="relative h-[10px] w-44 -skew-x-[56deg] mb-4"
        >
          <Space className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-center bg-no-repeat"></Space>
        </Space>
      </Space>

      <div className="h-96 w-10/12 mt-24  mx-40">
        <AutoPlaySwipeableViews
          interval={3000} // Set the interval for auto-play in milliseconds
          style={{
            height: "100%",
            width: "100%",
          }}
          enableMouseEvents={false} // Disable mouse events
          slideStyle={{ overflow: "visible" }} // Ensure content is visible outside the slide
          slideClassName="focus:outline-none" // Remove focus outline on slides
          resistance // Enable resistance effect on swiping
          resistanceFactor={0.5} // Set resistance factor for swiping
          innerRef={swipeableViewsRef} // Assign the ref to the SwipeableViews component
        >
          {renderCarouselItems()}
        </AutoPlaySwipeableViews>
      </div>
    </>
  );
};

export default LandingNews;
