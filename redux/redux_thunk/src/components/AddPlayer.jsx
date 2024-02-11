/** @format
 *
 * Student instructions:
 * Copy contents for this file from the react_redux exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */

import { postPlayer } from "../redux/actionCreators/thunks/AddPlayer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export const AddPlayer = () => {
  const [name, setName] = useState("");
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      const maxId =
        players && players.length > 0
          ? Math.max(...players.map((player) => player.id)) + 1
          : 1;
      const newPlayer = {
        name: name,
        id: maxId,
        isActive: false,
      };

      dispatch(postPlayer(newPlayer));
      setName("");
    }
  };

  return (
    <div>
      <form id="submit-player" onSubmit={handleSubmitForm}>
        <input
          id="input-player"
          placeholder="Enter name"
          type="text"
          onChange={handleNameChange}
          value={name}
        />
        <button className="btn-add" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};