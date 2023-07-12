import config from "../config";
import LandingPage from "../pages/landingPage/LandingPage";
import RegisterPage from "../pages/landingPage/Register";
import EventDetailPage from "../view/events/EventDetailPage";
import EventsPage from "../view/events/EventsPage";
import Home from "../view/home/Home";
import Login from "../view/login/Login";
import NewsPage from "../view/news/NewsPage";
import ProfilePage from "../view/profile/ProfilePage";


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
const eventsDetailRoutes = {
    path: config.routes.eventDetail,
    component: EventDetailPage,
}
const personalDetailRoutes = {
    path: config.routes.profile,
    component: ProfilePage,
}



const notRegisterRoutes = [landingPageRoute, loginRoutes, registerRoutes]
const registeredRoutes = [landingPageRoute, homeRoutes, personalDetailRoutes, newsRoutes, eventsRoutes, eventsDetailRoutes]
export { notRegisterRoutes, registeredRoutes };



