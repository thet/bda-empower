<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User Name</label>
    <input required v-model="username" placeholder="User name"/>
    <label>Password</label>
    <input required v-model="password" type="password" placeholder="Password"/>
    <button type="submit">Login</button>
  </form>
</template>
<script>
export default {

  data () {
    return {
      username: '',
      password: ''
    };
  },

  methods: {
    login () {
      let username = this.username;
      let password = this.password;
      this.$store.dispatch('login/LOGIN', { username, password })
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error));
    }
  }

}
</script>
