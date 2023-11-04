import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // redirect
      navigate('/collections');
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
