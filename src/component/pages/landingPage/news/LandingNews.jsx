import { grey } from "@ant-design/colors";
import { Space, Typography } from "antd";
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

  return (
    <>
      <Space className="flex flex-col items-center mx-64 mt-10">
        <Title level={4} color={grey.primary} className="uppercase">
          News & Events
        </Title>
        <Title>One91 Stories</Title>
        <div className="relative mt-2">
          <div
            className="absolute h-10 w-80 bottom-0 left-1/2 transform -translate-x-1/2 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://www.isd191.org/uploaded/themes/default_20/images/heading-background.svg')`,
            }}
          ></div>
        </div>
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
