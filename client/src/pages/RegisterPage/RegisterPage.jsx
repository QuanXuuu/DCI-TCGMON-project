import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import "./RegisterPage.scss";


const RegisterPage = () => {
    return (
        <div className="RegisterPage">
            <Logo />
            <div className="RegisterWelcomeContainer">
                <h1>Welcome!</h1>
                <h2>Sign up now, it`s free.</h2>
            </div>

            <RegisterForm />
          <Button text={ "Create account" }  />
        <button className="RegisterPageLoginButton">Login</button>
        </div>
    )

}





export default RegisterPage;