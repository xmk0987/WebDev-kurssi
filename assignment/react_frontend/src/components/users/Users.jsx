import React, { useEffect } from "react";
import { User } from "./User";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../redux/actions/users/userActions";

import { stateTypes } from "../../tests/constants/components";
import { Message } from "../Message";

export const Users = () => {

  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (auth.user.role === 'customer') {
      navigate('/');
    }
    else if (auth.user.role === 'guest') {
      navigate('/login');
    } 
  },[auth.user.role]);

  const users = useSelector(state => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.role === 'admin' && users.length === 0) {
      console.log("get users");
      dispatch(getUsers());
    }
  }, []);

  return (
    <>
      <h1 className="page-header">Users</h1>
      <Message />
      {users.length === 0 ? <div data-testid="empty-container"></div>
      : 
      users.map((user) => (
        <User key={user.id} user={user}/>
      ))}
      
    </>
  );
};

  