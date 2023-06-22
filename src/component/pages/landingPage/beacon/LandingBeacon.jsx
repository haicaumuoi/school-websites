import { Carousel, Image, Space, Typography, theme } from "antd";
import React from "react";
import picture from "./img/img1.jpg";

import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../utilities/styling/arrows";
import { grey, yellow } from "@ant-design/colors";

const { Text, Title } = Typography;

const LandingBeacon = () => {
  const school = [
    {
      title: "Elementary School",
      catchphrase:
        "Burnsville High School Burnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High School",
      img: picture,
    },
    {
      title: "Secondary School",
      catchphrase:
        "Burnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High School",
      img: picture,
    },
    {
      title: "High School",
      catchphrase:
        "Burnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High SchoolBurnsville High School",
      img: picture,
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const { useToken } = theme;
  const { token } = useToken();

  return (
    <>
      <Space className="flex flex-col items-center mx-64 mt-24">
        <Title level={4} color={grey.primary} className="uppercase">
          Testimonial
        </Title>
        <Title>Become a Beacon</Title>
        <Space
          style={{
            backgroundColor: token.colorPrimaryBg,
          }}
          className="relative h-[10px] w-44 -skew-x-[56deg] mb-4"
        >
          <Space className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-center bg-no-repeat"></Space>
        </Space>
      </Space>
      <div
        style={{
          backgroundColor: token.colorPrimaryBg,
        }}
        className="w-10/12 mx-auto mt-24 h-[35rem]"
      >
        <Carousel draggable className="h-[35rem]">
          {school.map((item) => (
            <div className="h-[35rem] relative">
              <Space direction="vertical" className="w-10/12 justify-end">
                <div
                  className="bg-white my-auto h-[28rem] relative 
              flex ml-10 flex-col mt-14 items-center justify-evenly pr-32"
                >
                  <Text className="text-lg w-2/3 text-center">
                    {item.catchphrase}
                  </Text>
                  <Title level={3}>{item.title}</Title>
                </div>

                <div className="absolute top-32 right-0 transform -translate-y-12 -translate-x-12">
                  <Image
                    src={item.img}
                    preview={false}
                    className="transform"
                    style={{
                      clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
                    }}
                    width={400}
                    height={400}
                  />
                </div>
              </Space>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default LandingBeacon;
