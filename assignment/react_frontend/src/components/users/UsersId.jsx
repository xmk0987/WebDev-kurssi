import React from "react";



export const UsersId = () => {
  return (
    <>
      <h1 className="page-header">User 2</h1>
      <div class="user-container" data-testid="inspect-container">
        <div class="user-info">
          <p class="user-name" data-testid="name-value">Onni</p>
          <p class="user-role" data-testid="role-value">Customer</p>
          <p class="user-email" data-testid="email-value">oonni@gmail.com</p>
        </div>
        <div class="user-actions">
          <button class="user-modify" data-testid="modify">Modify</button>
          <button class="user-delete" data-testid="delete">Delete</button>
        </div>
      </div>
    </>
  );
};
