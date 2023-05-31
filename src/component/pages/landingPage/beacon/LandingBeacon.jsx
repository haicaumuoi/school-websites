import { grey } from "@ant-design/colors";
import { Space, Typography } from "antd";
import React from "react";
import picture from "./img/img1.jpg";

const { Text, Title } = Typography;

const LandingBeacon = () => {
  const school = [
    {
      title: "Elementary School",
      catchphrase: "Burnsville High School",
      img: picture,
    },
    {
      title: "Secondary School",
      catchphrase: "Burnsville High School",
      img: picture,
    },
    {
      title: "High School",
      catchphrase: "Burnsville High School",
      img: picture,
    },
  ];
  return (
    <>
      <Space className="flex flex-col items-center mx-64 mt-24">
        <Title level={4} color={grey.primary} className="uppercase">
          Testimonials
        </Title>
        <Title>Become a Beacon</Title>
        <div className="relative mt-2">
          <div
            className="absolute h-10 w-80 bottom-0 left-1/2 transform -translate-x-1/2 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://www.isd191.org/uploaded/themes/default_20/images/heading-background.svg')`,
            }}
          ></div>
        </div>
      </Space>

      {/* Make me a div that have yellow background*/}
      <Space className="h-[40rem] flex flex-col items-center w-full">
        <Space className="h-[20rem] bg-white w-full">{""}</Space>

        <div className="relative w">
          <div
            className="h-[28rem] flex justify-center items-center 
        w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {school.map((item) => (
              <div
                className={`flex w-[22%] flex-col mx-10 justify-end items-center 
            bg-cover bg-no-repeat h-full shadow-inner`}
                style={{
                  backgroundImage: `url(${item.img})`,
                  boxShadow: "inset 0 -60px 70px 50px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div className="uppercase text-white w-4/5 text-3xl mb-4 font-semibold text-center">
                  {item.title}
                </div>
                <div className="uppercase text-xl text-white font-semibold mb-5">
                  {item.catchphrase}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Space>
    </>
  );
};

export default LandingBeacon;
