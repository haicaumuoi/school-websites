import { Typography } from 'antd'
import React from 'react'
import LandingCarousel from '../../pages/landingPage/carousel/LandingCarousel'
import LandingExperiences from '../../pages/landingPage/experience/LandingExperiences'
import LandingNews from '../../pages/landingPage/news/LandingNews'
import LandingEvents from '../../pages/landingPage/events/LandingEvents'
import LandingBeacon from '../../pages/landingPage/beacon/LandingBeacon'

const Home = () => {
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

    )
}

export default Home