import { Typography } from "antd";
import React, { useRef } from "react";

import SwipeableViews from "react-swipeable-views";
import { events } from "../events/newsConst";
import "./event.css";

const { Title, Text, Paragraph } = Typography;

const LandingEvents = () => {
  const swipeableViewsRef = useRef(null);

  const itemsPerSlide = 4;

  const renderCarouselItems = () => {
    const totalItems = events.length;
    const totalSlides = Math.ceil(totalItems / itemsPerSlide);
    const carouselItems = [];

    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * itemsPerSlide;
      const endIndex = startIndex + itemsPerSlide;
      const slideItems = events.slice(startIndex, endIndex);

      const slide = (
        <div className="carousel-slide flex" key={i}>
          {slideItems.map((item) => (
            <div className="carousel-item flex-shrink-0 w-1/3" key={item.id}>
              <a href="#" className="flex justify-center">
                <div className="flex flex-col justify-center items-center py-4">
                  <div className="relative">
                    <div className="skew-background px-10" />
                    <Text>{item.month}</Text>
                    <Title paddingXXS marginXXS delete copyable={false}>
                      {item.date}
                    </Title>
                  </div>
                </div>
                <div className="flex flex-col items-start pl-8">
                  <Title>{item.title}</Title>
                  <Text>
                    {item.startTime} - {item.endTime}
                  </Text>
                  <Paragraph>{item.location}</Paragraph>
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
  return (
    <div className="h-96 w-10/12 my-24 mx-40">
      <SwipeableViews
        style={{
          height: "100%",
          width: "100%",
        }}
        slideStyle={{ overflow: "visible" }} // Ensure content is visible outside the slide
        slideClassName="focus:outline-none" // Remove focus outline on slides
        resistance // Enable resistance effect on swiping
        resistanceFactor={0.5} // Set resistance factor for swiping
        innerRef={swipeableViewsRef} // Assign the ref to the SwipeableViews component
      >
        {renderCarouselItems()}
      </SwipeableViews>
    </div>
  );
};

export default LandingEvents;
