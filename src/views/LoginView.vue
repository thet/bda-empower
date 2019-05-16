<template>
  <v-form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User Name</label>
    <v-text-field required v-model="username" placeholder="User name" />
    <label>Password</label>
    <v-text-field required v-model="password" type="password" placeholder="Password" />
    <v-btn type="submit">Login</v-btn>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },

  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch('login/LOGIN', { username, password })
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error));
    }
  }
};
</script>
