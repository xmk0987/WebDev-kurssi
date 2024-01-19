<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->


 <template>
  <div>
    <h2>Add Player</h2>
    <form id="submit-player" @submit.prevent ="handleSubmit">
      <input id="input-player" placeholder="Enter name" v-model="name"/>
      <button class="btn-add" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ""
    }
},
methods: {
  handleSubmit() {
    this.$emit('add-player', this.name)
    this.name = "";
  }
}
}

</script>