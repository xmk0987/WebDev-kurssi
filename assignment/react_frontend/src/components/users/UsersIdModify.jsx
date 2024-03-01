import React, { useState, useEffect } from "react";
import { getUser, modifyUser } from "../../redux/actions/users/userActions";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "../Message";
import { stateTypes } from "../../tests/constants/components";
import { SUCCESS } from "../../redux/actions/actionTypes";

export const UsersIdModify = () => {
  const { userId } = useParams();
  const users = useSelector(state => state.users);
  const currentUser = useSelector(state => state.auth.user);
  const [user, setUser] = useState(users.find(user => user.id === userId) || "");
  const [selectedRole, setSelectedRole] = useState(user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.role === 'admin') {
      const fetchData = async () => {
        if (!user) {
          const result = await getUser(userId);
          setUser(result);
        }
        dispatch({ type: SUCCESS, payload: {message:"User fetched", stateType: stateTypes.user}});

      };

      fetchData();
    }
  }, [currentUser.role]);

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleRoleChange = (event) => {
    event.preventDefault();
    setSelectedRole(event.target.value);
    
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyUser(user.id, selectedRole));
    navigate(-1); 
  }

  return (
    <>
      <h1 className="page-header">User Modify</h1>
      <Message />
      <form className="user-modify-form" data-testid="form-container" onSubmit={handleFormSubmit}>
        <div className="form-group mg-bot-1">
          <p data-testid="name-value">{user.name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="role-select">Role:</label>
          <select data-testid="role-select" className="role-select" value={selectedRole} onChange={handleRoleChange}>
            <option value="admin">admin</option>
            <option value="customer">customer</option>
          </select>
        </div>
        <div className="form-group mg-top-1">
          <button type="submit"  data-testid="submit" disabled={user.role === selectedRole}>Submit</button>
          <button type="button" className="user-inspect" data-testid="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};