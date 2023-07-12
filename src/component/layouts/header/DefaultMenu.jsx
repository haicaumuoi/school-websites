import { Menu, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const DefaultMenu = () => {
  return (

      <Link to="/login">
          <Typography className="text-xl font-black uppercase hover:text-blue-600 transition-all">Login</Typography>
      </Link>
       
  )
}

export default DefaultMenu