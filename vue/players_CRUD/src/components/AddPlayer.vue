<!-- 
  Student instructions to create this component:

  1. Create a form with an id of "submit-player" for submitting a new player. It emits an event called "add-player" with the name of the new player as a parameter when submitted.

  2. Create an input field with an id of "input-player" where the name of the new player should be added. Optionally Add a placeholder attribute for the input.

  3. Create a button with a class of "btn-add" that will submit the form when clicked.


  While you might pass the unit tests, there may be some extra attributes or functionality that you need to add in order to get the component to work properly in the e2e tests. Please refer to the e2e tests for more details (found in cypress/e2e).

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