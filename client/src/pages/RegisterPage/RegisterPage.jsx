import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import "./RegisterPage.scss";


const RegisterPage = () => {
    return (
        <div className="RegisterPage">
            <Logo height={ "80" }/>
            <div className="RegisterWelcomeContainer">
                <div>
                    <h1>Welcome!</h1>
                    <h2>Sign up now, it's free.</h2>
                </div>
                    <RegisterForm />
                </div>
            <div className="RegisterPageButtonsWrapper">
                <Button text={ "Create account" }  />
                <button className="RegisterPageLoginButton">Login</button>
            </div>
        </div>
    )

}





export default RegisterPage;