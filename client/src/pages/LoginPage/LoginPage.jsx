import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import Button from "../../components/Button/Button.jsx";
import "./LoginPage.scss"

const LoginPage = () => {
    return (
        <div className="LoginPage">
            <Logo height={"80"} />
            <div className="LoginTextAndFormBox">
                <div>
                    <h1>Welcome back!</h1>
                </div>
                <LoginForm />
                <div className="LoginFormContainer">
                        <button className="ForgotPasswordButton">
                        Forgot your password?
                        </button>
                </div>       
            </div>
                <div className="LoginAndRegisterContainer">
                    <Button text={ "Login" }  />
                    <button className="LoginPageRegisterButton">Register
                    </button>
                </div>
        </div>
    )
}

export default LoginPage;