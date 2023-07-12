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
    <div className="h-screen w-screen bg-opacity-75 bg-cover bg-center flex items-center justify-center bg-blend-darken" style={{ backgroundImage: "url('https://cdn.memiah.co.uk/uploads/counselling-directory.org.uk/image_gallery/fotografierende-333oj7zFsdg-unsplash-1592414589-1603440321-hero.jpg')" }}>
    <div className="bg-black bg-opacity-70 py-8 px-4 text-white w-full h-full flex justify-center items-center">
    <Typography>
    <div className="flex items-center justify-center">
    <Button
      onClick={() => {
        googleSignIn(dispatch);
      }}
      className="py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-gray-200 flex items-center"
    >
    <img width={24} height={24} style={{
      marginRight: 8
    }} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
      Login with Google
    </Button>
  </div>
</Typography>

    </div>
  </div>
  
  
  );
};

export default Login;
