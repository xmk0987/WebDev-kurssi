/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only name and id are passed to this component as props. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */
import { useDispatch } from "react-redux";
import {getSelectedPlayer} from '../redux/actionCreators/thunks/ListPlayer';

export const ListPlayer = ({ name, id }) => {
	const dispatch = useDispatch();

	if (!name || !id) {
	  return null;
	}

	const handleClick = () => {
		dispatch(getSelectedPlayer(id))
	}
	
	return (
	  <>
	  	  <li id={`player-${id}`}>
				<a href={`#${id}`} onClick={handleClick}>
				{name}
				</a>
			</li>
	  </>
	);
  };
  
