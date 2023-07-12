import { Layout } from "antd";
import React from "react";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";

const { Content } = Layout;

const DefaultLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Layout>
        <Layout>
          <Content className="py-4">{children}</Content>
        </Layout>
      </Layout>

      <FooterComponent />
    </Layout>
  );
};

export default DefaultLayout;
