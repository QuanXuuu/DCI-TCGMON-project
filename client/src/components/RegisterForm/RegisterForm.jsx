import { useState } from 'react';
// import Button from '../Button/Button';
import axios from '../../api/axios';
import './RegisterForm.scss';

const REGISTER_URL = '/api/register';

const RegisterForm = ({ onAddUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    const newUser = {
      email,
      password,
    };
    onAddUsers(newUser);
    console.log(newUser);

    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          email,
          password,
        },
        {
          Headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="RegisterForm">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <input
          className="RegisterFormInputOne"
          type="email"
          name="email"
          value={email}
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* <Button text={'Create account'} link={'login'}/> */}
        <button className="signUp-button">Sign Up New User</button>
      </form>
    </div>
  );
};

export default RegisterForm;
