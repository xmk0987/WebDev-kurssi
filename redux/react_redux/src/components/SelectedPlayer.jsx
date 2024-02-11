/** @format */

/** @format
 * @description
 * Student instructions:
 * Copy contents for this file from the react_fetch exercise of the react week.
 *
 * BEWARE: No props are passed to this component from now on. Instead, the selectedPlayer is fetched from the redux store.

 */

import { useSelector } from 'react-redux';

export const SelectedPlayer = () => {
  const player = useSelector(state => state.selectedPlayer);

  return (
    <>
    {player && <div id="selected-player">
      <h2>Selected Player</h2>
      <p id="player-name">{player.name}</p>
      <p id="player-status">{player.isActive ? "active" : "inactive"}</p>
    </div>
    }
    </>
  );
};
