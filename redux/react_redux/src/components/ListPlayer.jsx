/* eslint-disable react/prop-types */
/** @format
 *
 * @description
 * Student instructions:
 *
 * Copy contents for this file from the players_fetch exercise of the react week. There are no changes to this file otherwise
 *
 *
 *
 */

export const ListPlayer = ({ player, onClick }) => {
  return (
    <div>
        { player && <li id={player.id}>
        <a tabIndex="0" role="link" onClick={() => onClick(player.id)}>
          {player.name}
        </a>
      </li>}
    </div>

  );
};
