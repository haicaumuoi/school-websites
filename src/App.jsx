import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import config from './component/config';
import DefaultLayout from './component/layouts/DefaultLayout';
import LandingPage from './component/pages/landingPage/LandingPage';
import adminRoutes from './component/routes/routes';

function App() {
// Get the current theme
const isDarkMode = useSelector(state => state.darkMode);

// Determine which algorithm to use
const { defaultAlgorithm, darkAlgorithm, } = theme;

 const [routeList, setRouteList] = useState([]);
  const authenticated = true;
  const userType = 'admin';

  // Update routeList based on userType
  useEffect(() => {
    switch (userType) {
      case 'admin':
        setRouteList(adminRoutes);
        break;
      default:
        break;
    }
  }, [userType]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgBase: '#fff',
          colorBgLayout: '#fff',
          colorPrimary: '#ffec3d',
        }
      }}>
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
