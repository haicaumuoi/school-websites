import { Button, Typography } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import { googleSignIn } from "../../utilities/firebase/firebase";
import { useDispatch } from "react-redux";

const { Title } = Typography;

const Login = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const additionalPath = pathSegments.slice(1).join(" / ");
  const dispatch = useDispatch();

  return (
    <Typography>
      <Title>Login{additionalPath && ` - ${additionalPath}`}</Title>
      <Button
        onClick={() => {
          googleSignIn(dispatch);
        }}
      >
        Login
      </Button>
    </Typography>
  );
};

export default Login;
