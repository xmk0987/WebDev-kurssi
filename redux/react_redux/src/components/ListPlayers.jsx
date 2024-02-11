/* eslint-disable react/prop-types */
/** @format */

/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */
import { useSelector } from 'react-redux';
import { ListPlayer } from './ListPlayer';

export const ListPlayers = ({selectPlayer}) => {
  const players = useSelector(state => state.players)
  return (
    <div>
      <h2>List of players</h2>
      <ul id="players-list">
        {players && players.map((player) => (
          <ListPlayer key={player.id} player={player} selectPlayer={selectPlayer}/>
        ))}
      </ul>
    </div>
  );
};
