import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import card1 from "../../assets/images/landing-page-card-1.png";
import card2 from "../../assets/images/landing-page-card-2.png";
import "./LandingPage.scss";

const LandingPage = () => {
    return (
        <div className="LandingPage">
            <Logo />
            <div className="image-wrapper">
                <img className="card card1" src={ card1 } alt="card1" />
                <img className="card card2" src={ card2 } alt="card2" />
            </div>
            <div className="button-wrapper">
                <Button text={ "Login" } uppercase={ true } />
                <Button text={ "Register" } uppercase={ true } />
            </div>
        </div>
    );
};

export default LandingPage;
