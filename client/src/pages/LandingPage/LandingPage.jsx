import { useState, useEffect } from "react";

import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import card1 from "../../assets/images/landing-page-card-1.png";
import card2 from "../../assets/images/landing-page-card-2.png";
import "./LandingPage.scss";

const LandingPage = () => {

    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const updateWindowHeight = () => {
            const newHeight = window.innerHeight;
            setHeight(newHeight);
        };

        window.addEventListener("resize", updateWindowHeight);
        updateWindowHeight();

        return () => window.removeEventListener("resize", updateWindowHeight);

    }, []);

    return (
        <div className="LandingPage">
            <Logo />
            <div className="image-container" style={{ height: `calc(${ height }px - 39.2rem)`, width: `calc(100% - ${ height - 392 >= 328 ? 0 : 328 - (height - 392) }px)` }}>
                <div className="image-wrapper card1">
                    <img className="card" src={ card1 } alt="card1" />
                </div>
                <div className="image-wrapper card2">
                    <img className="card" src={ card2 } alt="card2" />
                </div>
            </div>
            <div className="button-wrapper">
                <Button text={ "Login" } uppercase={ true } />
                <Button text={ "Register" } uppercase={ true } />
            </div>
        </div>
    );
};

export default LandingPage;

// background: `url(${ card2 })` 328px
