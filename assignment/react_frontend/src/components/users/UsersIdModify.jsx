import React from "react";



export const UsersIdModify = () => {
  return (
    <>
      <h1 class="page-header">User 2</h1>
      <form className="user-modify-form" data-testid="form-container">
        <div class="form-group mg-bot-1">
          <label for="name-value">Name:</label>
          <input type="text" id="name-value" value="Onni" />
        </div>
        <div class="form-group">
          <label for="role-select">Role:</label>
          <select id="role-select" class="role-select">
            <option value="admin" selected>Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div class="form-group mg-top-1">
          <button type="submit" class="user-inspect" data-testid="submit">Submit</button>
          <button type="button" class="user-inspect" data-testid="cancel">Cancel</button>
        </div>
      </form>
    </>
  );
};
