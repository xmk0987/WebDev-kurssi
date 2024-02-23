import React, {useState, useEffect} from "react";
import {ERROR, SUCCESS} from '../../redux/actions/actionTypes';

import { Message } from "../Message";
import { validEmailRegex } from "../../tests/constants/components";
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";
import { stateTypes } from "../../tests/constants/components";
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
    }
  }, [auth.error]);

  useEffect(() => {
    if (auth.user.role !== "guest") {
      navigate('/') 
    }
  },[auth.user.role]);

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
    if (trimmedName.length < 3) {
      dispatch({type: ERROR, payload: {message:"Name must be 3 characters", stateType: stateTypes.auth}});
    }
    else if (!validEmailRegex.test(trimmedEmail)) {
      dispatch({type: ERROR, payload: {message:"Email not in right format", stateType: stateTypes.auth}});
    } 
    else if (password.length < 10) {
      dispatch({type: ERROR, payload: {message:"Password must be 10 characters or more", stateType: stateTypes.auth}});
    }
    else if (password !== passwordConfirm) {
      dispatch({type: ERROR, payload: {message:"Passwords must match", stateType: stateTypes.auth}});
    }
    else {
      dispatch({ type: SUCCESS, payload: {message:"Register success", stateType: stateTypes.auth}});
      dispatch(registerUser({ name: trimmedName,email: trimmedEmail, password }));
    }
  };

  return <>
      <h1 className="page-header">Register</h1>
      <Message />
      <form className="register-form" data-testid="form-container" onSubmit={e => handleRegisterSubmit(e)}>
        <div className="form-item">
          <label>Name</label>
          <input type="text" placeholder="Enter name" data-testid="name-input" value={name} onChange={e => handleChange(e, "name")} />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input type="text" placeholder="Enter email" data-testid="email-input" value={email} onChange={e => handleChange(e, "email")} />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" placeholder="Password" data-testid="password-input" value={password} onChange={e => handleChange(e, "password")} />
        </div>
        <div className="form-item">
          <label>Password confirmation</label>
          <input type="password" placeholder="Password Confirmation" data-testid="passwordConfirmation-input" value={passwordConfirm} onChange={e => handleChange(e, "passwordConfirm")} /> 
        </div>
        <button type="submit" className="default-btn" data-testid="submit">Register</button>
      </form>
    </>
};
  