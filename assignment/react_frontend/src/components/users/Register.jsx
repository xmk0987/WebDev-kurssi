import React, {useState, useEffect} from "react";
import {ERROR} from '../../redux/actions/actionTypes';

import { Message } from "../Message";
import { validEmailRegex } from "../../tests/constants/components";
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { registerUser } from "../../redux/actions/auth/authActions";

export const Register = () => {
  const auth = useSelector((state) => state.auth);
  const notification = useSelector((state) => state.notification);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.error === false) {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [auth.error]);

  const handleChange = (e, param) => {
    e.preventDefault();

    switch (param) {
      case "name":
        setName(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      case "passwordConfirm":
        setPasswordConfirm(e.target.value);
        break;

      default:
        break;
    }
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (name.length < 3) {
      dispatch({type: ERROR, payload: "Name must be 3 characters"});
    }
    else if (!validEmailRegex.test(trimmedEmail)) {
      dispatch({type: ERROR, payload: "Email not in right format"});
    } 
    else if (password.length < 10) {
      dispatch({type: ERROR, payload: "Password must be 10 characters"});
    }
    else if (password !== passwordConfirm) {
      dispatch({type: ERROR, payload: "Passwords must match"});
    }
    else {
      dispatch(registerUser({ name: trimmedName,email: trimmedEmail, password }));
    }
  };

  return <>
      <h1 className="page-header">Register</h1>
      {notification.message.length > 0 ? <Message /> : null}
      <form className="register-form" data-testid="form-container" onSubmit={e => handleRegisterSubmit(e)}>
        <div className="form-item">
          <label>Name</label>
          <input required type="text" placeholder="Enter name" data-testid="name-input" value={name} onChange={e => handleChange(e, "name")} />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input required type="email" placeholder="Enter email" data-testid="email-input" value={email} onChange={e => handleChange(e, "email")} />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" required placeholder="Password" data-testid="password-input" value={password} onChange={e => handleChange(e, "password")} />
        </div>
        <div className="form-item">
          <label>Password confirmation</label>
          <input type="password" required placeholder="Password Confirmation" data-testid="passwordConfirmation-input" value={passwordConfirm} onChange={e => handleChange(e, "passwordConfirm")} /> 
        </div>
        <button type="submit" className="default-btn" data-testid="submit">Register</button>
      </form>
    </>
};
  