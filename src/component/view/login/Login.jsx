import { Button, Typography } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleSignIn } from "../../utilities/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import _ from "lodash";

const { Title } = Typography;

const Login = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const additionalPath = pathSegments.slice(1).join(" / ");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if(_.get(user, "schoolId") != -1 && _.get(user, "schoolId") != null) {
    navigate("/");
    } else if (_.get(user, "schoolId") == -1){
      navigate("/register");
    } else {
      return;
    }
}, [user]);
  
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
