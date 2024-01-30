/* eslint-disable react/prop-types */
/** @format
 * Student instructions:
 * Use the given template with props to create a AuthUser component similar to the AuthUser component in the Vue exercise. Instead of using a template, use JSX.
 *
 * isLoggedIn is a prop boolean that indicates if the user is logged in or not.
 * onLogin is a prop function that will be called when the login link is clicked. It should be called with the username and password as arguments.
 * onRegister is a prop function that will be called when the register link is clicked. It should be called with the username and password as arguments.
 * onLogout is a prop function that will be called when the logout link is clicked. It should be called with no arguments.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests.
 */

import { useState } from "react";

export const AuthUser = ({isLoggedIn, onLogin, onRegister, onLogout}) => {
  const [isLogin, setIsLogin ] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleLoginState = () => {
    setIsLogin(!isLogin);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>{isLoggedIn ? "Logged in" : isLogin ? "Login" : "Register"}</h2>
      <a role="link" onClick={isLoggedIn ? onLogout : toggleLoginState}>{isLoggedIn ? "Logout" : !isLogin ? "Go to login" : "Go to register"}</a>
      {isLoggedIn ? null : 
      <form id="auth-form" onSubmit={(e) => handleSubmitForm(e)}>
        <input id="username" type="text" required placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input id="password" type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button className="btn-auth" type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>}
    </div>
  );
};
