/* eslint-disable react/prop-types */
/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */


import { ListPlayer } from "./ListPlayer.jsx";

// eslint-disable-next-line react/prop-types
export const ListPlayers = ({players, getPlayer}) => {


  return (
    <div>
      <ul id="players-list">
        {players && players.map((player) => (
          <ListPlayer key={player.id} player={player} onClick={getPlayer} />
        ))}
      </ul>
    </div>
  );
};
