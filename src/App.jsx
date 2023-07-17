import { blue } from "@ant-design/colors";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import config from "./component/config";
import DefaultLayout from "./component/layouts/DefaultLayout";
import LandingPage from "./component/pages/landingPage/LandingPage";
import { notRegisterRoutes, registeredRoutes } from "./component/routes/routes";
import { getSchool } from "./redux/slices/schoolSlice";

function App() {
  // Get the current theme
  const isDarkMode = useSelector((state) => state.darkMode);

  // Determine which algorithm to use
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const [routeList, setRouteList] = useState([]);
  const authenticated = true;
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const school = useSelector((state) => state.schoolReducer.school);
  const schoolLoading = useSelector((state) => state.schoolReducer.schoolLoading);

  const location = window.location.hostname;

  const dispatch = useDispatch();

  console.log("school", school)

  // Update routeList based on userType
  useEffect(() => {
    if (login != null && login != -1) {
      setRouteList(registeredRoutes);
    } else {
      setRouteList(notRegisterRoutes);
    }
  }, [login]);

  useEffect(() => {
    dispatch(getSchool({ location }));
  }, []);

  if (schoolLoading) return <>
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  </>;


  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgBase: "#fff",
          colorBgContainer: "fff",
          colorPrimaryBg: school.theme,
          colorBgLayout: "#fff",
          colorPrimary: school.theme,
          colorTextHeading: "#000",
          colorTextBase: "#000",
        },
      }}
    >
      <Routes>
        {!authenticated ? (
          <>
            <Route path={config.routes.landingPage} element={<LandingPage />} />
          </>
        ) : (
          routeList.map((route, index) => {
            const Page = route.component;
            const Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })
        )}
      </Routes>
    </ConfigProvider>
  );
}

export default App;
