<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->

 <template>
  <div>
    <li :id="`player-${player.id}`">
      <a @click="this.$emit('player-clicked', this.player.id);" tabindex="0">{{ player.name }}</a>
    </li>
  </div>
</template>

<script>
export default {
  props: ['player']
}
</script>

<style>
  a:hover {
    cursor: pointer;
  }
</style>