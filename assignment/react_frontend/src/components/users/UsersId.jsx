import React, {useState, useEffect} from "react";
import { deleteUser, getUser } from "../../redux/actions/users/userActions";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkStatus } from "../../redux/actions/auth/authActions";
import { Message } from "../Message";
import { SUCCESS } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";

export const UsersId = () => {
  const { userId } = useParams();
  const users = useSelector(state => state.users);
  const currentUser = useSelector(state => state.auth.user);
  const [user, setUser] = useState(users.find(user => user.id === userId) || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkStatus());
    if (currentUser.role === 'admin' && user === "") {
      const fetchData = async () => {
        if (user === "") {
          const result = await getUser(userId, dispatch);
          setUser(result);
        }

      };
  
      fetchData();
    } 
  }, [currentUser.role]);

  useEffect(() => {
    dispatch({ type: SUCCESS, payload: {message:"User fetched", stateType: stateTypes.user}});

  },[]);

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id));
    navigate(-1);
  }

  return (
    <>
      <h1 className="page-header" data-testid="name-value">{user.name}</h1>
      <Message />
      <div className="user-container" data-testid="inspect-container">
        <div className="user-info">
          <p className="user-email" data-testid="email-value">{user.email}</p>
          <p className="user-role" data-testid="role-value">{user.role}</p>
        </div>
        {currentUser.id === user.id ? null : 
        <div className="user-actions">
          <button className="user-modify" data-testid="modify" onClick={() => navigate(`/users/${user.id}/modify`)}>Modify</button>
          <button className="user-delete" data-testid="delete" onClick={handleDeleteUser}>Delete</button>
        </div>}
      </div>
    </>
  );
};
