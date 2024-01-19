<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
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
