import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './LoginForm.scss';

const LoginForm = ({
  isWrongPassword,
  setIsWrongPassword,
  isAllFieldsFilled,
  setIsAllFieldsFilled,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log('All fields must be filled');
      return setIsAllFieldsFilled(!isAllFieldsFilled);
    }

    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        navigate('/collections');
      } else {
        navigate('/login');
        console.log(json.message);
        setIsWrongPassword(!isWrongPassword);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="LoginForm">
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
