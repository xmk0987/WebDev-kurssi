<!-- 
  The Vue projects for this course are expected to be made using Single File Components (SFCs). You can get started by going through the following sections from the Vue documentation (https://vuejs.org/guide/introduction.html):
  - Getting Started
  - Essentials
  - Components In-Depth

  Once you are familiar with the basics of Vue, you can start working on the project. The project is divided into 4 parts, each with its own set of instructions. The first part is the main component of the application, the second part is the component (and its child component) that displays the list of players, and the third part is the component that displays the selected player. The fourth part is displaying the status of the request to the API.

  Student instructions:

  This is the main component of the application. It is used to fetch and store the players data upon creation, and to display the list of players and the selected player.

  1. Inside the root div element, import and add the  RequestStatus, ListPlayers, and SelectedPlayer components as child elements. Remember to pass in the appropriate props and content to the child components.

  2. Create two methods for fetching all players and fetching one specific player. The first method should handle the logic for fetching all the players and displaying them in the players array. The second method should handle the logic for fetching a specific player and relaying that specific player to the SelectedPlayer component. Use the REQ_STATUS object to display the appropriate status message when the request is loading, when it is successful, and when it fails. 
  
  The URLS for fetching all players and fetching a specific player remain the same throughout the course (http://localhost:3001/api/players, http://localhost:3001/api/players/:id). Once the backend is running, you can visit http://localhost:3001 to see the API documentation.

  3. Whenever the page is refreshed, fetch players data, store and display it.
 -->


 <template>
  <div id="app">
    <RequestStatus :reqStatus="reqStatus"/>
    <ListPlayers :players="players" :getPlayer="fetchPlayer"/>
    <SelectedPlayer :player="activePlayer"/>
  </div>
</template>

<script>
import RequestStatus from './components/RequestStatus.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';


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
    SelectedPlayer
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
    }
  },

  

};
</script>