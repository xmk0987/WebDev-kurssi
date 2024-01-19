<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise.

  In addition to the code from the previous exercise, you need to add the following logic inside the SelectedPlayer component:

  - Display the player's id in an element with the class attribute "player-id".

  - Inside the element with the id "player-status", add a label with the text "active" or "inactive" depending on the status of the player. 
  The label should have an id of "checkbox-label", and inside it there should be a checkbox with an id of "checkbox". 
      - By default, the checkbox should be checked if the player is active and unchecked if the player is inactive. Unlike in elm 
      exercises, toggling the checkbox should not automatically update the player in the backend, instead it is done by the update 
      button (check next point). For styling purposes, add an empty span with the class attribute "checkmark" inside the label. 
      Much like in the elm exercises, the checkbox should be listening to the change event. 

  - Add an update button with the class attribute "btn-update". The button should be disabled if the 
  current active state of the checkmark is same with players "isActive" state. 
  Add logic to send the "put-player" event when the button is clickable and the user clicks it.
   The event should pass the players "isActive" state as a parameter.

  - Add a delete button with the class attribute "btn-delete". Add logic to send the "delete-player" 
  event when the user clicks the button. The event should pass the id of the player as a parameter.

 -->


 <template>
  <div v-if="player">
    <h1>Selected Player</h1>
    <div id="selected-player">
      <p class="player-id">{{ player.id }}</p>
      <p id="player-name">{{ player.name }}</p>
      <div id="player-status">
        <label id="checkbox-label">
          <input type="checkbox" id="checkbox" v-model="checkboxValue"/>
          <span class="checkmark"></span>
          {{ !checkboxValue ? "inactive" : "active" }}
        </label>
      </div>
      <div>
        <button class="btn-update" @click="handleUpdate" :disabled="!isSameActiveState">UPDATE</button>
        <button class="btn-delete" @click="handleDelete">DELETE</button>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        checkboxValue: false
      }
    },
    props: ['player'],
    computed: {
      isSameActiveState() {
        return this.player.isActive === this.checkboxValue;
      }
    },
    methods: {
      handleUpdate() {
        this.$emit('put-player', !this.player.isActive);
      },
      async handleDelete() {
        await this.$emit('delete-player', this.player.id);
      },
      
    },
    watch: {
      player: {
        immediate: true,
        handler(newPlayer) {
          if (newPlayer) {
            this.player.isActive === !this.player.isActive;
            this.checkboxValue === this.player.isActive;
          }
        },
      }
    }
  }
  
</script>
