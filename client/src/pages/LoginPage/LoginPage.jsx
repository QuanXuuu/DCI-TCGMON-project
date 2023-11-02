import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import Button from '../../components/Button/Button.jsx';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal.jsx';
import LoginPageErrorModal from '../../components/LoginPageErrorModal/LoginPageErrorModal.jsx';

import './LoginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginPage">
      <Logo height={'80'} />

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
        <Button text={'Login'} link={'collections'} />
        <button
          className="LoginPageRegisterButton"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
      {/* <ErrorAndSuccessModal customClassName="rp-lp-error-style" easmText={'Wrong username and/or password'} /> */}
      <ErrorAndSuccessModal customClassName="lp-success-style" easmText={'Successfully registered to TCGmon!'} />
    </div>
  );
};

export default LoginPage;
