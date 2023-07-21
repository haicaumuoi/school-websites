import config from "../config";
import LandingPage from "../pages/landingPage/LandingPage";
import RegisterPage from "../pages/landingPage/Register";
import SchoolErrorPage from "../view/SchoolErrorPage";
import EventsPage from "../view/events/EventsPage";
import Home from "../view/home/Home";
import Login from "../view/login/Login";
import NewsPage from "../view/news/NewsPage";
import ProfilePage from "../view/profile/ProfilePage";
import SchoolPage from "../view/school/SchoolPage";
import NewsDetailsPage from "../view/news/NewsDetailsPage";
import SchoolDetailPage from "../view/school/SchoolDetailPage";


const landingPageRoute = {
    path: config.routes.landingPage,
    component: LandingPage,
}
const homeRoutes = {
    path: config.routes.home,
    component: Home,
}
const loginRoutes = {
    path: config.routes.login,
    component: Login,
}
const registerRoutes = {
    path: config.routes.register,
    component: RegisterPage,
}
const newsRoutes = {
    path: config.routes.news,
    component: NewsPage,
}

const eventsRoutes = {
    path: config.routes.events,
    component: EventsPage,
}
const newsDetailRoutes = {
    path: config.routes.newsDetail,
    component: NewsDetailsPage,
}
const personalDetailRoutes = {
    path: config.routes.profile,
    component: ProfilePage,
}
const alumniDetailRoutes = {
    path: config.routes.alumni,
    component: ProfilePage,
}
const schoolErrorRoutes = {
    path: config.routes.errorSchool,
    component: SchoolErrorPage,
}

const schoolRoutes = {
    path: config.routes.school,
    component: SchoolPage,
}
const schoolDetailRoutes = {
    path: config.routes.schoolDetail,
    component: SchoolDetailPage,
}


const notRegisterRoutes = [landingPageRoute, loginRoutes, registerRoutes, schoolErrorRoutes]
const registeredRoutes = [landingPageRoute, homeRoutes, personalDetailRoutes, newsRoutes, eventsRoutes, newsDetailRoutes, schoolRoutes, schoolDetailRoutes, alumniDetailRoutes]
export { notRegisterRoutes, registeredRoutes };



