<!-- 
  COPY AND PASTE THE CODE FROM THE PREVIOUS EXERCISE, BUT:
  - Beware, the template is different: AuthUser is now a child of the 
  root div element. When copy-pasting the logic to the new template, 
  make sure to add the AuthUser component back in. 
  - You are no longer automatically fetching the players every time t
  he App is rendered. Instead, you should only fetch the players when 
  the user is logged in successfully.

  What is the function of the AuthUser component in the big picture?
  - Depending on the state of the AuthUser component, the other components
   should be displayed or hidden (except for the RequestStatus component,
    which is always visible). If the user is logged in, the AddPlayer,
     ListPlayers, and SelectedPlayer components should be displayed. 
     If the user is not logged in, only the AuthUser component and 
     the RequestStatus component should be displayed.

  1. Inside the root div element, give the AuthUser the appropriate props
   and event listeners. It should emit the "login", "register", and 
   "logout" events. You need to give it the "isLoggedIn" prop,
    which is used to determine the state of the AuthUser component. 
    If you removed the AuthUser componenet because you overwrote the 
    whole template with the new one, remember to add it back in.

  2. Create a method for registering a user when the AuthUser
   component emits the "register" event. This method should handle 
   the logic for registering a user. After a successful registration, 
   save the user's username and password into the App's state. 
  
  The backend uses the HTTP Basic auth, which means that the username 
  and password as sent in base64 encoded format in the Authorization 
  header upon every request except for the registration request. 

  The header contents should be of the following format: 
  "Basic <base64 encoded username:password>". The username and 
    password should be separated by a colon. The username and password 
    should be base64 encoded. You can use the btoa() function to 
    encode the username and password. For example, if the username 
    is "user" and the password is "password", the header could be 
    generated with the following code: `Basic ${window.btoa(`user:password`)}`; 

  The backend will respond with 401 if the Authorization header is 
  missing, and with a status of 403 if the credentials are invalid. 

  After a succesful registration, the app should attempt to fetch 
  players from the database. If it fails to fetch the players, 
  then the user should stay logged out. If it succeeds, the
   user should be logged in and the app state should be updated 
   accordingly and the players list should be displayed. Notice 
   that separate login is not required after a successful registration,
    because the user is already logged in.
  
  3. Create a method for logging in when the AuthUser component 
  emits the "login" event. This method should handle the logic 
  for logging in a user. As described earlier, the backend does 
  not have a separate login endpoint. Instead, the app should try 
  to fetch players from the database with the given credentials
   using Basic auth. If the request is successful, the user is 
   logged in and the app state should be updated accordingly.

  4. Create a method for logging out when the AuthUser component 
  emits the "logout" event. This method should handle the logic 
  or logging out a user. This method should be called when the 
  logout event is emitted from the AuthUser component.
   When the user logs out, the application should be reset
    to its initial state (ergo, remove all data that was fetched
     from the database)

  HINT: Remember to add the Authorization header to every request
   except the user registration. 

 -->


 <template>
  <AuthUser v-if="!isLoggedIn" @login="login" @register="register" @logout="logout" :isLoggedIn="isLoggedIn"/>
  <RequestStatus :reqStatus="reqStatus"/>
  <div id="app" v-if="isLoggedIn">
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
import AuthUser from './components/AuthUser.vue';


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
      activePlayer: null,
      isLoggedIn: false,
      username: null,
      password: null
    }
  },
  components: {
    RequestStatus,
    ListPlayers,
    SelectedPlayer,
    AddPlayer,
    AuthUser
},
  created(){
    this.fetchAllPlayers();
    
  },
  methods: {
    async fetchAllPlayers () {
      try {
        this.reqStatus = REQ_STATUS.loading

        const response = await fetch('http://localhost:3001/api/players',{
        headers: {
          'Authorization': `Basic ${window.btoa(`${this.user}:${this.password}`)}`,
        }
        });
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

        
        const response = await fetch(`http://localhost:3001/api/players/${id}`,{
        headers: {
          'Authorization': `Basic ${window.btoa(`${this.user}:${this.password}`)}`,
        }
      });

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
            'Authorization': `Basic ${window.btoa(`${this.user}:${this.password}`)}`,
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
            'Authorization': `Basic ${window.btoa(`${this.user}:${this.password}`)}`,
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
          headers: {
          'Authorization': `Basic ${window.btoa(`${this.user}:${this.password}`)}`,
          }
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
    },
    async register (username, password) {
      console.log("in register")
      console.log(username);
      console.log(password);

      const newUser = {
        username: username,
        password: password
      }

      try {
        this.reqStatus = REQ_STATUS.loading;
        const response = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        });

        if (!response.ok) {
          this.reqStatus = REQ_STATUS.error;
          throw new Error('Update failed');
        }
        console.log(response);

        this.reqStatus = REQ_STATUS.success;
        this.username = username;
        this.password = password;
        console.log("user registered");
        this.fetchAllPlayers();
      } catch (err) {
        console.error(err);
      }
    }, 
    async login(username, password) {
      console.log("in login");
      this.username = username;
      this.password = password;
      this.fetchAllPlayers();
      this.isLoggedIn = true;

      
    },
    async logout(){
      this.players =  [],
      this.reqStatus = null,
      this.activePlayer = null,
      this.isLoggedIn = false,
      this.username = null,
      this.password = null
    }
  },

  

};
</script>
