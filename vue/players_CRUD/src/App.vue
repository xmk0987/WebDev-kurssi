<!-- 
  COPY AND PASTE YOUR CODE FROM THE PREVIOUS EXERCISE HERE. Also implement the following:

  1. Create a method for adding a new player. This method should handle the logic for adding a new player to the 
  database and updating the players array. This method should also reset the form only if the request was successful. 
  This method should be called when the add player form is submitted.

  2. Create a method for deleting a player. This method should handle the logic for deleting a player 
  from the database and updating the players array. This method should be called when the delete button is 
  clicked in the SelectedPlayer component.

  3. Create a method for updating a player. This method should handle the logic for updating a player in the 
  database and updating the players array. This method should be called when the update button is 
  clicked in the SelectedPlayer component.
 -->

<template>
  <div id="app">
    <RequestStatus :reqStatus="reqStatus"/>
    <AddPlayer @add-player="addPlayer"/>
    <ListPlayers :players="players" :getPlayer="fetchPlayer"/>
    <SelectedPlayer :player="activePlayer" @put-player="updatePlayer" @delete-player="deletePlayer"/>
  </div>
</template>

<script>

import RequestStatus from './components/RequestStatus.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import AddPlayer from './components/AddPlayer.vue';



const REQ_STATUS = {
  loading: "Loading...",
  success: "Finished!",
  error: "An error has occurred!!!",
};

export default {
  data () {
    return {
      players: [],
      reqStatus: null,
      activePlayer: null
    }
  },
  components: {
    RequestStatus,
    ListPlayers,
    SelectedPlayer,
    AddPlayer
  },
  created(){
    this.fetchAllPlayers();
    
  },
  methods: {
    async fetchAllPlayers () {
      try {
        this.reqStatus = REQ_STATUS.loading

        const response = await fetch('http://localhost:3001/api/players');
        if (!response.ok) {
          this.reqStatus= REQ_STATUS.error;
          throw new Error("Couldn't fetch data.")
        }
        const data = await response.json();
        this.players = data;
        this.reqStatus = REQ_STATUS.success;

      } catch (err) {
        console.error(err);
      }
    },
    async fetchPlayer (id) {
      try {
        this.reqStatus = REQ_STATUS.loading

        const response = await fetch(`http://localhost:3001/api/players/${id}`);
        if (!response.ok) {
          this.reqStatus = REQ_STATUS.error;
          throw new Error("Couldn't fetch player.")
        }
        const data = await response.json();

        console.log(data);
        this.activePlayer = data;
        this.reqStatus = REQ_STATUS.success;


      } catch (err) {
        console.error(err);
      }
    },
    async addPlayer (name) {
      try {
        this.reqStatus = REQ_STATUS.loading;

        const newPlayer = {
          id: this.players.length + 1,
          name: name,
          isActive: false
        }

        const response = await fetch('http://localhost:3001/api/players/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayer)
        });

        if (!response.ok) {
          this.reqStatus = REQ_STATUS.error;
          throw new Error('Add failed');
        }

        this.reqStatus = REQ_STATUS.success;
        this.players.push(newPlayer);
        
      } catch(err) {
        console.error(err);
      }
    },
    async updatePlayer (active) {
      const newPlayer = {
          id: this.activePlayer.id,
          name: this.activePlayer.name,
          isActive: active
      }
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(`http://localhost:3001/api/players/${this.activePlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayer)
        });

        if (!response.ok) {
          this.reqStatus = REQ_STATUS.error;
          throw new Error('Update failed');
        }

        this.reqStatus = REQ_STATUS.success;
        this.activePlayer.isActive = active;

      } 
      catch(err) {
        console.error(err);
      }
    },
    async deletePlayer (id) {
      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch(`http://localhost:3001/api/players/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          this.reqStatus = REQ_STATUS.error;
          throw new Error('Update failed');
        }

        this.reqStatus = REQ_STATUS.success;
        this.players = this.players.filter(player => player.id !== id);
        this.activePlayer = null;
      } 
      catch(err) {
        console.error(err);
      }
    }
  },

  

};
</script>