import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Logo from '../../components/Logo/Logo';
import * as images from '../../assets/images/index.js';
import './LandingPage.scss';

const LandingPage = () => {
  const [height, setHeight] = useState(0);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    switch (Math.floor(Math.random() * 7) + 1) {
      case 1:
        setCurrentImage(images.cards1);
        break;

      case 2:
        setCurrentImage(images.cards2);
        break;

      case 3:
        setCurrentImage(images.cards3);
        break;

      case 4:
        setCurrentImage(images.cards4);
        break;

      case 5:
        setCurrentImage(images.cards5);
        break;

      case 6:
        setCurrentImage(images.cards6);
        break;

      case 7:
        setCurrentImage(images.cards7);
        break;

      case 8:
        setCurrentImage(images.cards8);
        break;
    }

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
        <img src={currentImage} alt="pokemon-cards" />
      </div>
      <div className="button-wrapper">
        <Button text={'Login'} uppercase={true} />
        <Button text={'Register'} uppercase={true} />
      </div>
    </div>
  );
};

export default LandingPage;
