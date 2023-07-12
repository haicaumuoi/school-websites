import { blue } from "@ant-design/colors";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import config from "./component/config";
import DefaultLayout from "./component/layouts/DefaultLayout";
import LandingPage from "./component/pages/landingPage/LandingPage";
import { notRegisterRoutes, registeredRoutes } from "./component/routes/routes";

function App() {
  // Get the current theme
  const isDarkMode = useSelector((state) => state.darkMode);

  // Determine which algorithm to use
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const [routeList, setRouteList] = useState([]);
  const authenticated = true;
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  
  // Update routeList based on userType
  useEffect(() => {
    if(login != null && login != -1) {
      setRouteList(registeredRoutes);
    } else {
      setRouteList(notRegisterRoutes);
    }
  }, [login]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgBase: "#fff",
          colorBgContainer: "fff",
          colorPrimaryBg: blue[5],
          colorBgLayout: "#fff",
          colorPrimary: blue[5],
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
