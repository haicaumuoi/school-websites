import { grey } from "@ant-design/colors";
import { Space, Typography, theme } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;

const LandingExperiences = () => {

  const school = useSelector((state) => state.schoolReducer.school);
  const schoolAttributes = school.attributes;


  const { useToken } = theme;
  const { token } = useToken();

  return (
    <>
      <Space className="flex flex-col items-center mx-64">
        <Title level={4} color={grey.primary} className="uppercase">
          Introduction
        </Title>
        <Title
          style={{
            marginBottom: "0px",
            textTransform: "uppercase",
          }}
        >
          {school.name}
        </Title>
        <Space
          style={{
            backgroundColor: token.colorPrimaryBg,
          }}
          className="relative h-[10px] w-44 -skew-x-[56deg] mb-4"
        >
          <Space className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-center bg-no-repeat"></Space>
        </Space>

        <Title level={5} className="text-center">
          {school.description}
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
            {schoolAttributes.map((item) => (
              <div
                key={item.title}
                className={`flex w-[22%] flex-col mx-10 justify-end items-center 
              bg-cover bg-no-repeat h-full shadow-inner`}
                style={{
                  backgroundImage: `url(${item.img})`,
                  boxShadow: "inset 0 -60px 70px 50px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div className="uppercase text-white w-4/5 text-3xl mb-4 font-semibold text-center">
                  {item.descption}
                </div>

              </div>
            ))}
          </div>
        </div>

        <Space
          style={{
            backgroundColor: token.colorPrimaryBg,
          }}
          className="h-[20rem]  flex flex-col items-center w-screen"
        >
          {""}
        </Space>
      </Space>
    </>
  );
};

export default LandingExperiences;
