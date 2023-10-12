import logo from "../../assets/images/pokemon-logo.svg";
import "./Logo.scss";

const Logo = () => {
    return (
        <div className="Logo">
            <img src={ logo } />
        </div>
    );
};

export default Logo;
