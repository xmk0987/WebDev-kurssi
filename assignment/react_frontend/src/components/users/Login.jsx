import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';

import { validEmailRegex } from "../../tests/constants/components";
import {ERROR} from '../../redux/actions/actionTypes';
import { Message } from "../Message";
import { loginUser } from "../../redux/actions/auth/authActions";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const auth = (state => state.auth);

  useEffect(() => {
    if (auth.error === false) {
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [auth.error]);

  const handleChange = (e, param) => {
    e.preventDefault();
    switch (param) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const user = useSelector(state => state.auth.user);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (!validEmailRegex.test(email)) {
      dispatch({type: ERROR, payload: "Email not in right format"});
    } 
    else if (password.length < 10) {
      dispatch({type: ERROR, payload: "Password must be 10 characters"});
    } else {
      dispatch(loginUser({email:email, password:password}));
    }
  };

  useEffect(() => {
    console.log(user);
  },[user]);

  return (
    <>
      <h1 className="page-header">Login</h1>
      <Message />
      <form className="register-form" data-testid="form-container" onSubmit={(e) => handleLoginSubmit(e)}>
        <div className="form-item">
          <label>Email</label>
          <input required type="email" placeholder="Enter email"
            data-testid="email-input" value={email}
            onChange={(e) => handleChange(e, "email")} />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" required placeholder="Password"
            data-testid="password-input" value={password}
            onChange={(e) => handleChange(e, "password")} />
        </div>
        <button type="submit" className="default-btn" data-testid="submit">Register</button>
      </form>
    </>
  );
};
