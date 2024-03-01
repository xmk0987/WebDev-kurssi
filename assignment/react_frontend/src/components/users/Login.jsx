import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Message } from "../Message";
import { loginUser } from "../../redux/actions/auth/authActions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email:email, password:password}));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <>
      <h1 className="page-header">Login</h1>
      <Message />
      <form className="register-form" data-testid="form-container" onSubmit={handleLoginSubmit}>
        <div className="form-item">
          <label htmlFor="email-input">Email</label>
          <input
            type="text"
            id="email-input"
            placeholder="Enter email"
            data-testid="email-input"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            id="password-input"
            required
            placeholder="Password"
            data-testid="password-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="user-input default-btn" data-testid="submit">Login</button>
      </form>
    </>
  );
};
