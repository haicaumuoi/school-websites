import { grey } from "@ant-design/colors";
import { Image, Space, Typography, theme } from "antd";
import React from "react";
import picture from "./img/img.jpg";

const { Text, Title } = Typography;

const LandingExperiences = () => {
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
      <Space className="flex flex-col items-center mx-64">
        <Title level={4} color={grey.primary} className="uppercase">
          Experience One91
        </Title>
        <Title>Blaze Your Path</Title>
        <div className="relative mt-2">
          <div
            className="absolute h-10 w-80 bottom-0 left-1/2 transform -translate-x-1/2 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://www.isd191.org/uploaded/themes/default_20/images/heading-background.svg')`,
            }}
          ></div>
        </div>

        <Title level={5} className="text-center">
          Burnsville-Eagan-Savage School District 191 is a future-forward school
          district creating barrier-free pathways for learning for everyone in
          our community. We believe learning is a lifelong pursuit, and create
          programs, services and opportunities that inspire this belief.{" "}
        </Title>
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

        <Space className="h-[20rem] bg-yellow-400 flex flex-col items-center w-screen">
          {""}
        </Space>
      </Space>
    </>
  );
};

export default LandingExperiences;
