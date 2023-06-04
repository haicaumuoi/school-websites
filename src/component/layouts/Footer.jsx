import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React from "react";
import schoolLogo from "../../assets/school-logo.png";

const { Text, Title } = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const FooterComponent = () => {
  return (
    <div className="h-[30rem] flex justify-between flex-col items-center">
      <div className="flex justify-between items-center w-10/12 h-3/4 mb-14">
        <div className="">
          <img width={100} src={schoolLogo} />
          <Space direction="vertical" className="mt-2">
            <Text>Burnsville-Eagan-Savage School District 191</Text>
            <Text>Diamondhead Education Center</Text>
            <Text>200 W. Burnsville Pkwy</Text>
            <Text>Burnsville Minnesota 55337</Text>
            <Text>Phone: 952-707-2000</Text>
          </Space>
        </div>
        <div className=" w-2/5 h-3/4 flex justify-between items-start">
          <div>
            <Title level={4}>Quick Links</Title>
            <Space direction="vertical" className="mt-2">
              <Text>Burnsville-Eagan-Savage School District 191</Text>
              <Text>Diamondhead Education Center</Text>
              <Text>200 W. Burnsville Pkwy</Text>
              <Text>Burnsville Minnesota 55337</Text>
            </Space>
          </div>
          <div className="flex items-end flex-col">
            <Title level={4}>Quick Links</Title>
            <Space direction="horizontal" className="mt-2">
              <Button icon={<FacebookFilled />} />
              <Button icon={<InstagramOutlined />} />
              <Button icon={<TwitterOutlined />} />
              <Button icon={<YoutubeOutlined />} />
              <Button icon={<LinkedinOutlined />} />
            </Space>
          </div>
        </div>
      </div>
      <div className="bg-black h-1/6 w-full">1</div>
    </div>
  );
};

export default FooterComponent;
