import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Message } from "../Message";
import { loginUser } from "../../redux/actions/auth/authActions";
import { SUCCESS } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.error === false) {
      setEmail("");
      setPassword("");
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SUCCESS, payload: {message:"Login success", stateType: stateTypes.auth}});

    dispatch(loginUser({email:email, password:password}));

  };

  return (
    <>
      <h1 className="page-header">Login</h1>
      <Message />
      <form className="register-form" data-testid="form-container" onSubmit={(e) => handleLoginSubmit(e)}>
        <div className="form-item">
          <label>Email</label>
          <input type="text" placeholder="Enter email"
            data-testid="email-input" value={email}
            onChange={(e) => handleChange(e, "email")} />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" required placeholder="Password"
            data-testid="password-input" value={password}
            onChange={(e) => handleChange(e, "password")} />
        </div>
        <button type="submit" className="user-input default-btn" data-testid="submit">Login</button>
      </form>
    </>
  );
};
