import React from "react";
import { Layout, Breadcrumb, Divider } from "antd";
import { useLocation, Link } from "react-router-dom";
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";

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
      <Divider className="mt-24 w-10/12" />
      <FooterComponent />
    </Layout>
  );
};

export default DefaultLayout;
