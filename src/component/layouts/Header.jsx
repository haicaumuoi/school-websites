import { Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import schoolLogo from "../../assets/school-logo.png";
import DefaultMenu from "./header/DefaultMenu";
import LoginMenu from "./header/LoginMenu";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const school = useSelector((state) => state.schoolReducer.school);
  return (
    <Header className="flex justify-between items-center h-24 bg-white">
      {login != null || login != -1 ? (
        <>
          <Link to="/home">
            <img width={100} src={school.icon || schoolLogo} />
          </Link>

          <LoginMenu />
        </>
      ) : (
        <>
          <Link to="/">
            <img width={100} src={school.icon || schoolLogo} />
          </Link>
          <DefaultMenu />
        </>
      )}
    </Header>
  );
};

export default HeaderComponent;
