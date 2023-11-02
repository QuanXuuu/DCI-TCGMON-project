import { useState } from 'react';
import LoginPageErrorModal from '../LoginPageErrorModal/LoginPageErrorModal';
import './LoginForm.scss';

const LoginForm = () => {

  return (
    <div className="LoginForm">
      <form action="">
        {/* <LoginPageErrorModal /> */}
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />
      </form>
    </div>
  );
};

export default LoginForm;
