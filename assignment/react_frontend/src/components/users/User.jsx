import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/actions/users/userActions";

export function User({ user }) {
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteUser = useCallback(() => {
    dispatch(deleteUser(user.id));
  }, [dispatch, user.id]);

  const handleModify = useCallback(() => {
    navigate(`/users/${user.id}/modify`);
  }, [navigate, user.id]);

  const handleInspect = useCallback(() => {
    navigate(`/users/${user.id}`);
  }, [navigate, user.id]);

  return (
    <div
      className="user-container"
      data-testid={`list-item-${user.id}-container`}
    >
      <div className="user-info">
        <p className="user-name" data-testid="name-value">
          {user.name}
        </p>
        <p className="user-role" data-testid="role-value">
          {user.role}
        </p>
      </div>
      <div className="user-actions">
        {currentUser.id === user.id ? (
          <button
            className="user-inspect"
            data-testid={`inspect-${user.id}-link`}
            onClick={handleInspect}
          >
            Inspect
          </button>
        ) : (
          <>
            <button
              className="user-inspect"
              data-testid={`inspect-${user.id}-link`}
              onClick={handleInspect}
            >
              Inspect
            </button>
            <button
              className="user-modify"
              data-testid="modify"
              onClick={handleModify}
            >
              Modify
            </button>
            <button
              className="user-delete"
              data-testid="delete"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}