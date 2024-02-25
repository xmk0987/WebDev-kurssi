import React, { useEffect } from "react";
import { User } from "./User";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/users/userActions";

import { stateTypes } from "../../tests/constants/components";
import { Message } from "../Message";
import { checkStatus } from "../../redux/actions/auth/authActions";

export const Users = () => {

  const auth = useSelector(state => state.auth);

  const users = useSelector(state => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkStatus());
    if (auth.user.role === 'admin' && users.length === 0) {
      dispatch(getUsers());
    }
  }, [auth.user.role]);

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

  