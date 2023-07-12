import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../../redux/slices/darkModeSlice";
import LandingBeacon from "./beacon/LandingBeacon";
import LandingCarousel from "./carousel/LandingCarousel";
import LandingExperiences from "./experience/LandingExperiences";

const LandingPage = () => {
  return (
    <>
      <section>
        <LandingCarousel />
      </section>

      <section className="py-10">
        <LandingExperiences />
      </section>

      <section>
        <LandingBeacon />
      </section>
      <Divider className="mt-24 w-10/12" />
    </>
  );
};

export default LandingPage;
