import { Button, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../../redux/slices/darkModeSlice';
import { addNotification } from '../../utilities/commonServices/CommonService';
import { facebookSignIn, googleSignIn } from '../../utilities/firebase/firebase';
import LandingCarousel from './carousel/LandingCarousel';
import LandingNews from './news/LandingNews';
import LandingEvents from './events/LandingEvents';
import LandingBeacon from './beacon/LandingBeacon';
import LandingExperiences from './experience/LandingExperiences';


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

        <section className='py-10'>
            <LandingExperiences/>
        </section>

        <section>
            <LandingNews/>
        </section>

        <section>
            <LandingEvents/>
        </section>

        <section>
            <LandingBeacon/>
        </section>
    </>
    )
}

export default LandingPage