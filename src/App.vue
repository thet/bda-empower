<template>
  <div id="app">
    <router-view/>
    <footer>
      <router-link v-if="!isLoggedIn" to="login">Login</router-link>
      <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',

  computed : {
    isLoggedIn () {
      return this.$store.getters['login/isLoggedIn'];
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('login/LOGOUT')
      .then(() => {
        this.$router.push('/login')
      });
    }
  },

};
</script>
