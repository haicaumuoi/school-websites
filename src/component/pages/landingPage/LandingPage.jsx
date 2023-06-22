import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../../redux/slices/darkModeSlice";
import LandingBeacon from "./beacon/LandingBeacon";
import LandingCarousel from "./carousel/LandingCarousel";
import LandingEvents from "./events/LandingEvents";
import LandingExperiences from "./experience/LandingExperiences";
import LandingNews from "./news/LandingNews";

const LandingPage = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <section>
        <LandingCarousel />
      </section>

      <section className="py-10">
        <LandingExperiences />
      </section>

      <section>
        <LandingNews />
      </section>

      <section>
        <LandingEvents />
      </section>

      <section>
        <LandingBeacon />
      </section>
    </>
  );
};

export default LandingPage;
