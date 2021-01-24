import React, { useContext, useEffect } from 'react';
import '../CSS/home.css';
import Mainpage from '../components/Mainpage';
import StartParty from '../components/StartParty';
import JoinParty from '../components/JoinParty';
import AuthContext from '../context/userContext';
import queryString from 'query-string';
import AboutUs from '../components/AboutUs';
import Modal from "../components/Modal"
import Profile from "../components/Profile"

const Home = (props) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // store spotify token in localStorage
    const parsedHash = queryString.parse(window.location.hash);

    if (parsedHash.access_token) {
      localStorage.setItem('spotifyToken', JSON.stringify(parsedHash));
    }
  }, []);

  // Render

  // AuthRender
  if (user) {
    return (
      <div>
        <Modal 
        true = {true} />
        <StartParty />
        <JoinParty />
        {/* <Profile /> */}
        <AboutUs />
      </div>
    );
  }

  // NeedsSignin Render
  return (
    <>
      <div className='main'>
        <Mainpage />
      </div>
    </>
  );
};

export default Home;
