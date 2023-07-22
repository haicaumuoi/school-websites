import { Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import schoolLogo from "../../assets/school-logo.png";
import DefaultMenu from "./header/DefaultMenu";
import LoginMenu from "./header/LoginMenu";
import { Link } from "react-router-dom";
import NotRegisteredMenu from "./header/NotRegisteredMenu";

const { Header } = Layout;

const HeaderComponent = () => {
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const school = useSelector((state) => state.schoolReducer.school);

  const headerRender = () => {
    if (login !== undefined && login !== null && login != -1) {
      return (
        <>
          <Link to="/home">
            <img width={100} src={school.icon || schoolLogo} />
          </Link>
          <LoginMenu />
        </>
      )
    } else if (login && login == -1) {
      return (
        <>
          <Link to="/">
            <img width={100} src={school.icon || schoolLogo} />
          </Link>
          <NotRegisteredMenu />
        </>
      )
    } else {
      return (
        <>
          <Link to="/">
            <img width={100} src={school.icon || schoolLogo} />
          </Link>
          <DefaultMenu />
        </>
      )
    }

  }

  return (
    <Header className="flex justify-between items-center h-24 bg-white">
      {headerRender()}
    </Header>
  );
};

export default HeaderComponent;
