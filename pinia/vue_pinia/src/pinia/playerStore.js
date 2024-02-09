import { defineStore } from "pinia";
import { REQ_STATUS } from "../../cypress/e2e/constants";

/**
 * This is the store for the players. It will be used to manage the state of the players and the requests to the server.
 * The store will have the following state:
 * - players: an array of players
 * - selectedPlayer: the player selected to be updated
 * - reqStatus: the status of the request to the server
 * - playersURL: the URL of the players API
 *
 * DO NOT MODIFY THE STATE. State names are required to be the same as mentioned above to pass the tests.
 *
 * The names of the getters, actions and mutations are up to you.
 */

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    /**LEAVE THE STATE AS IT IS*/ players: [],
    selectedPlayer: null,
    reqStatus: REQ_STATUS.loading,
    playersURL: "http://localhost:3001/api/players",
  }),
  getters: {
    /** CREATE THESE */ getPlayers: (state) => state.players,
    getSelectedPlayer: (state) => state.selectedPlayer,
    getRequestStatus: (state) => state.reqStatus,
  },
  actions: {
    /** CREATE THESE */
    async fetchPlayers() {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(this.playersURL);
        const players = await response.json();
        this.players = players;
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        this.reqStatus = REQ_STATUS.error;
        console.log(error);
      }
    },
    async fetchPlayer(id) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(`${this.playersURL}/${id}`);
        const player = await response.json();
        this.selectedPlayer = player;
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        this.reqStatus = REQ_STATUS.error;
        console.log(error);
      }
    },
    async addPlayer(name) {
      try {
        console.log("ADD PLAYER", name);
        this.reqStatus = REQ_STATUS.loading;

        const response = await fetch(this.playersURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const newPlayer = await response.json();
        this.players = [...this.players, newPlayer];

        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        this.reqStatus = REQ_STATUS.error;
        console.log(error);
      }
    },
    async deletePlayer(id) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        await fetch(`${this.playersURL}/${id}`, { method: "DELETE" });
        this.players = this.players.filter((player) => player.id !== id);
        this.selectedPlayer = null;
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        this.reqStatus = REQ_STATUS.error;
        console.log(error);
      }
    },
    async updatePlayerStatus(state) {
      const player = { ...this.selectedPlayer, isActive: state };
      try {
        this.reqStatus = REQ_STATUS.loading;
        console.log("SELECTED PLAYER", this.selectedPlayer);
        console.log("UPDATE PLAYER", player);
        const response = await fetch(`${this.playersURL}/${player.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player),
        });

        const updatedPlayer = await response.json();
        console.log("UPDATED PLAYER", updatedPlayer);
        this.players = this.players.map((p) =>
          p.id === updatedPlayer.id ? updatedPlayer : p
        );
        this.selectedPlayer = updatedPlayer;
        this.reqStatus = REQ_STATUS.success;
      } catch (error) {
        this.reqStatus = REQ_STATUS.error;
        console.log(error);
      }
    },
  },
});
