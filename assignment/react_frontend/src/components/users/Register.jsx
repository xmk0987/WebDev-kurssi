import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERROR, SUCCESS } from "../../redux/actions/actionTypes";
import { Message } from "../Message";
import { validEmailRegex } from "../../tests/constants/components";
import { stateTypes } from "../../tests/constants/components";
import { registerUser } from "../../redux/actions/auth/authActions";

export const Register = () => {
  const auth = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.error === false) {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [auth.error]);

  const handleChange = useCallback((param) => (e) => {
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
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length < 3) {
      dispatch({
        type: ERROR,
        payload: {
          message: "Name must be 3 characters",
          stateType: stateTypes.auth,
        },
      });
    } else if (!validEmailRegex.test(trimmedEmail)) {
      dispatch({
        type: ERROR,
        payload: {
          message: "Email not in right format",
          stateType: stateTypes.auth,
        },
      });
    } else if (password.length < 10) {
      dispatch({
        type: ERROR,
        payload: {
          message: "Password must be 10 characters or more",
          stateType: stateTypes.auth,
        },
      });
    } else if (password !== passwordConfirm) {
      dispatch({
        type: ERROR,
        payload: {
          message: "Passwords must match",
          stateType: stateTypes.auth,
        },
      });
    } else {
      dispatch({
        type: SUCCESS,
        payload: { message: "Register success", stateType: stateTypes.auth },
      });
      dispatch(
        registerUser({ name: trimmedName, email: trimmedEmail, password })
      );
    }
  };

  return (
    <>
      <h1 className="page-header">Register</h1>
      <Message />
      <form
        className="register-form"
        data-testid="form-container"
        onSubmit={handleRegisterSubmit}
      >
        <div className="form-item">
          <label htmlFor="name-input">Name</label>
          <input
            type="text"
            id="name-input"
            placeholder="Enter name"
            data-testid="name-input"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email-input">Email</label>
          <input
            type="text"
            id="email-input"
            placeholder="Enter email"
            data-testid="email-input"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            id="password-input"
            placeholder="Password"
            data-testid="password-input"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <div className="form-item">
          <label htmlFor="passwordConfirmation-input">
            Password confirmation
          </label>
          <input
            type="password"
            id="passwordConfirmation-input"
            placeholder="Password Confirmation"
            data-testid="passwordConfirmation-input"
            value={passwordConfirm}
            onChange={handleChange("passwordConfirm")}
          />
        </div>
        <button type="submit" className="default-btn" data-testid="submit">
          Register
        </button>
      </form>
    </>
  );
};