<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->

 <template>
  <div>
    <h1>List of players</h1>
    <ul id="players-list">
      <a>
        <ListPlayer 
        v-for="player in players"
        :key="player.id"
        :player="player"
        @player-clicked="getPlayer(player.id)"
        />
      </a>
    </ul> 
  </div> 
</template>

<style>
 a {
  cursor: pointer
 }
</style>

<script>
import ListPlayer from './ListPlayer.vue'

export default {
  props: ['players', 'getPlayer'],
  components: {
    ListPlayer
  }
}

</script>
