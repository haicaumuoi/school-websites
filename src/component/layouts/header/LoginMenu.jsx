import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";


const LoginMenu = () => {
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
        <Menu.Item key="5" className="font-black text-xl uppercase">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
  )
}

export default LoginMenu