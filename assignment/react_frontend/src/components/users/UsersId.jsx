import React, {useState, useEffect} from "react";
import { deleteUser, getUser } from "../../redux/actions/users/userActions";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const UsersId = () => {
  const { userId } = useParams();
  const users = useSelector(state => state.users);
  const currentUser = useSelector(state => state.auth.user);
  const [user, setUser] = useState(users.find(user => user.id === userId) || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser.role === 'admin') {
      const fetchData = async () => {
        if (user === "") {
          const result = await getUser(userId);
          setUser(result);
        }
      };
  
      fetchData();
    } else if (currentUser.role === 'customer') {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, []);

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id));
    navigate(-1);
  }

  return (
    <>
      <h1 className="page-header">User {user.id}</h1>
      <div className="user-container" data-testid="inspect-container">
        <div className="user-info">
          <p className="user-name" data-testid="name-value">{user.name}</p>
          <p className="user-role" data-testid="role-value">{user.role}</p>
          <p className="user-email" data-testid="email-value">{user.email}</p>
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
