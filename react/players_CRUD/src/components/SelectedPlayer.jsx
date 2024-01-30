/* eslint-disable react/prop-types */

/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
 */
import { useEffect, useState } from "react";

export const SelectedPlayer = ({ player, handleDelete, handleUpdate }) => {
  const [checkboxValue, setCheckboxValue] = useState(player ? player.isActive : false);

  useEffect(() => {
    if (player) {
      setCheckboxValue(player.isActive);
    }
  }, [player]);

  if (!player) {
    return null;
  }

  return (
    <div id="selected-player">
      <h2>Selected Player</h2>
      <p id="player-name">{player.name}</p>
      <div id="player-status">
        <label id="checkbox-label">
          <input
            id="checkbox" 
            type="checkbox"
            checked={checkboxValue}
            onChange={() => setCheckboxValue(!checkboxValue)}
          />
          <span className="checkmark"></span>
          {checkboxValue ? "active" : "inactive"}
        </label>
      </div>
      <div>
        <button className="btn-delete" onClick={() => handleDelete(player.id)}>
          Delete
        </button>
        <button
          className="btn-update"
          onClick={() => handleUpdate(!player.isActive)}
          disabled={checkboxValue === player.isActive}
        >
          Update
        </button>
      </div>
    </div>
  );
};