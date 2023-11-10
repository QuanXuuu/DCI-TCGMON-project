import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import LoginPageErrorModal from '../LoginPageErrorModal/LoginPageErrorModal';
import './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      // redirect
      if (response.ok) {
        dispatch({ type: 'LOGIN', payload: json });
        navigate('/collections');
      } else {
        navigate('/login'); // OR redirect to landingPage?
        console.log('Please double check password');
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="LoginForm">
      <LoginPageErrorModal />
      <form action="/login" method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
