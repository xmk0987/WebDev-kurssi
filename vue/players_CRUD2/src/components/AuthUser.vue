<!-- 
  
  Student instructions to create this component:

  The functionality of this component is two fold: 
  1. Display a link that toggles between "Go to login", "Go to 
  register", and "Logout" depending on the value of the isLoggedIn 
  prop: By default, it is "Go to register", when the user is not 
  logged in.  
  - User logged in: display "Logout". The link should emit a 
  logout event when clicked.
  - User not logged in and in login: display "Go to register". 
  - User not logged in and in register: display "Go to login".
  
<<<<<<< HEAD
  2. When user is trying to log in or register, the component should 
  display a form with two input fields and a submit button. 
  The form should submit the username and password to the submit 
  function when submitted. The input fields should be required.
=======
  2. When user is trying to log in or register, the component should display a form with two input fields and a submit button.  The form should have an id of "auth-form". The form should submit the username and password to the submit function when submitted. The input fields should be required.
>>>>>>> 66867c305fa18e73d12641166514e8986f21bfa8

  - One input field for username with an id of "username", name of 
  "auth-username" and type of "text".
  - One input field for password with an id of "password", name of 
  "auth-password" and type of "password".
  - A submit button with a class of "btn-auth" with the text 
  "login" or "register" depending on the current state of the 
  component. If the user is trying to login, the button 
  should say "login" and emit a "login" event with the username and 
  password. If the user is trying to register, the button should say 
  "register" and emit a "register" event with the username and password.

  Once user is logged in or registered, the form should be hidden 
  and the link should change to "Logout".

 -->

 <template>
  <div>
    <a class="link" @click="!isLoggedIn ? toggleLink() : $emit('logout')">
      {{ !isLoggedIn ? (isLogin ? 'Go to register' : 'Go to login') : 'Log out' }}
    </a>
    <div v-if="!isLoggedIn" class="loginform flexColumn">
      <form class="flexColumn" @submit.prevent="isLogin ? handleLogin() : handleRegister()">
        <input id="username" name="auth-username" type="text" v-model="username" required placeholder="Username" />
        <input id="password" name="auth-password" type="password" v-model="password" required placeholder="Password" />
        <button class="btn-auth" type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>
    </div>
  </div>
</template>


<style>
  .loginform {
    text-align: center;
    width: 100%;
  }

  .flexColumn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #username, #password {
    height: 40px;
    width: 250px;
  }

</style>

 <script>
export default {
  data() {
    return {
      isLogin: true,
      username: null,
      password: null,
    };
  },
  methods: {
    toggleLink() {
      this.isLogin = !this.isLogin;
    },
    handleLogin() {
      if (this.validateInput()) {
        this.$emit('login', this.username, this.password);
        this.resetInput();
      }
    },
    handleRegister() {
      if (this.validateInput()) {
        this.$emit('register', this.username, this.password);
        this.resetInput();
      }
    },
    resetInput() {
      this.username = null;
      this.password = null;
    },
  }
};
</script>
