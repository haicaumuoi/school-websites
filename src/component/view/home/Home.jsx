import React from 'react'
import LandingBeacon from '../../pages/landingPage/beacon/LandingBeacon'
import LandingCarousel from '../../pages/landingPage/carousel/LandingCarousel'
import LandingExperiences from '../../pages/landingPage/experience/LandingExperiences'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const token = useSelector(state => state.authReducer.token);
  const navigate = useNavigate();
  const [carouselRef, carouselInView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust this value to control when the animation triggers
  });

  const [experiencesRef, experiencesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [beaconRef, beaconInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (!token) {
    navigate("/");
  }

  return (
    <>
      <motion.div
        ref={carouselRef}
        initial={{ opacity: 0, y: 20 }}
        animate={carouselInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <section>
          <LandingCarousel />
        </section>
      </motion.div>

      <motion.div
        ref={experiencesRef}
        initial={{ x: -1000 }}
        animate={experiencesInView ? { x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <section className="py-10">
          <LandingExperiences />
        </section>
      </motion.div>

      <motion.div
        ref={beaconRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={beaconInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <section>
          <LandingBeacon />
        </section>
      </motion.div>
    </>

  )
}

export default Home