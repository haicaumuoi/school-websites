import { Menu } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slices/authSlice";


const LoginMenu = () => {
  const dispatch = useDispatch();
  return (
    <Menu mode="horizontal" className="w-6/12 h-10 justify-end">
      <Menu.Item
        key="1"
        className="font-black text-xl uppercase"
      >
        <Link to="/news">News</Link>
      </Menu.Item>
      <Menu.Item key="2" className="font-black text-xl uppercase">
        <Link to="/events">Events</Link>
      </Menu.Item>
      <Menu.Item key="3" className="font-black text-xl uppercase">
        <Link to="/profile">Profile</Link>
      </Menu.Item>

      <Menu.Item key="5" className="font-black text-xl uppercase" onClick={() => {
        dispatch(logout())
      }}>
        Log Out
      </Menu.Item>
    </Menu>
  )
}

export default LoginMenu