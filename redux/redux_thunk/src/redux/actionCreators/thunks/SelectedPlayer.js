/** @format THUNK*/
import { removePlayer } from "../playersActions";
import { setStatus } from "../statusActions";
import { REQ_STATUS } from "../../../../cypress/e2e/constants";import { clearSelectedPlayer } from "../selectedPlayerActions";
}
/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */
export const deleteSelectedPlayer = (selectedPlayerId) => {
    return async (dispatch) => {
        dispatch(setStatus(REQ_STATUS.loading));
        try {
            const response = await fetch(`http://localhost:3001/api/players/${selectedPlayerId}`, {
                method: "DELETE"
            });
            console.log(response);
            if (response.ok) {
                dispatch(setStatus(REQ_STATUS.success));
                dispatch(removePlayer(selectedPlayerId));
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

/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (updatedActivity) => {};
