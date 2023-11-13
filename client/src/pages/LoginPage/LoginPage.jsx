import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal.jsx';

import './LoginPage.scss';

const LoginPage = ({ isRegisterSuccess, setIsRegisterSuccess }) => {
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="LoginPage">
      <Logo height={'80'} />
      <div className="LoginTextAndFormBox">
        <div>
          <h1>Welcome back!</h1>
        </div>

        <LoginForm isWrongPassword={isWrongPassword} setIsWrongPassword={setIsWrongPassword}/>
        <div className="LoginFormContainer">
          <button className="ForgotPasswordButton">
            Forgot your password?
          </button>
        </div>
      </div>
      <div className="LoginAndRegisterContainer">
        {/* <Button text={'Login'} link={'collections'} /> */}
        <button
          className="LoginPageRegisterButton"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
      {isRegisterSuccess && (
        <ErrorAndSuccessModal
          customClassName="success-modal"
          easmText={'Successfully registered to TCGmon!'}
        />
      )}
      {isWrongPassword && (
        <ErrorAndSuccessModal
        customClassName="rp-lp-error-style"
        easmText={'Wrong password'}
      />
      )}
    </div>
  );
};

export default LoginPage;
