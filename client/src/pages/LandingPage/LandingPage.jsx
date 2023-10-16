import { useState, useEffect } from 'react';

import Button from '../../components/Button/Button.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import cards from '../../assets/images/cards72 v1.png';
import './LandingPage.scss';

const LandingPage = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateWindowHeight = () => {
      const newHeight = window.innerHeight;
      setHeight(newHeight);
    };

    window.addEventListener('resize', updateWindowHeight);
    updateWindowHeight();

    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  return (
    <div className="LandingPage">
      <Logo height={'80'} />
      <div
        className="image-wrapper"
        style={{ height: `calc(${height}px - 35.2rem)` }}
      >
        <img src={cards} alt="pokemon-cards" />
      </div>
      <div className="button-wrapper">
        <Button text={'Login'} uppercase={true} />
        <Button text={'Register'} uppercase={true} />
      </div>
    </div>
  );
};

export default LandingPage;
