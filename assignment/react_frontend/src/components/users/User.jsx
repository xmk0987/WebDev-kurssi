import React from "react";

export function User({ }) {
  return (
    <div class="user-container">
      <div class="user-info">
        <p class="user-name" data-testid="name-value">Onni</p>
        <p class="user-role" data-testid="role-value">Customer</p>
      </div>
      <div class="user-actions">
        <button class="user-inspect" data-testid="inspect-2-link">Inspect</button>
        <button class="user-modify" data-testid="modify">Modify</button>
        <button class="user-delete" data-testid="delete">Delete</button>
      </div>
    </div>
  );
}
