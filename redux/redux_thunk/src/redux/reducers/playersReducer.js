/** @format REDUCERS*/

import {
	ADD_PLAYER,
	REMOVE_PLAYER,
	SET_PLAYERS,
	UPDATE_PLAYER,
} from '../constants';

const defaultState = [];

/**
 * @description reducer for players that returns the players ids and names in an array. The default state is an empty array. The action types are SET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER and UPDATE_PLAYER.  
 * - SET_PLAYERS action returns the payload that includes players. 
 * - ADD_PLAYER action returns the state with the new player added to the array. 
 * - REMOVE_PLAYER action returns the state where the specified player is removed from the array. 
 * - UPDATE_PLAYER action returns the state where the specified player is updated in the array.

 * @param {*} state - The players in an array.
 * @param {*} action - The action to be performed.
 * @returns {Array} - The players in an array.
 */
const playersReducer = (state = defaultState, action) => {
	switch (null) {
		default:
			return state;
	}
};

export default playersReducer;
