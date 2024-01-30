/* eslint-disable react/prop-types */
/** @format
 *
 * Student instructions:
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */

export const ListPlayer = ({ player, onClick }) => {
    return (
      <div>
        <li id={`player-${player.id}`}>
          <a tabIndex="0" role="link" onClick={() => onClick(player.id)}>
            {player.name}
          </a>
        </li>
      </div>
    );
  };
  