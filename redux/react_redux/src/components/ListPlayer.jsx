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
    <li id={`player-${player.id}`}>
      <a href={`#${player.id}`} onClick={() => onClick(player.id)}>
        {player.name}
      </a>
    </li>
  );
};
