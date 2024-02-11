/** @format THUNK*/
import { setStatus } from "../statusActions";
import {REQ_STATUS} from '../../../../cypress/e2e/constants';
import { addPlayer } from "../playersActions";
import {clearSelectedPlayer} from '../selectedPlayerActions';
/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk with dispatch as param
 */
export const postPlayer = (newPlayer) => {
    return async (dispatch) => {
        dispatch(setStatus(REQ_STATUS.loading)); // Dispatch loading status
        
        try {
            const response = await fetch('http://localhost:3001/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
            });
            
            if (response.ok) {
                const player = await response.json();
                dispatch(setStatus(REQ_STATUS.success));
                dispatch(addPlayer(player)); 
                dispatch(clearSelectedPlayer());
            } else {
                throw new Error(`Request rejected with status ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            dispatch(setStatus(REQ_STATUS.error)); 
        }
    };
};
