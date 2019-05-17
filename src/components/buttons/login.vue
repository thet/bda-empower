<template>
  <v-list class="pt-0" dense>
    <v-list-tile v-if="!isLoggedIn">
      <v-list-tile-action>
        <v-icon>person</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>
          <router-link v-if="!isLoggedIn" to="login" replace="true" append="false">Login</router-link>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile v-if="isLoggedIn">
      <v-list-tile-action>
        <v-icon>person_outline</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>
          <button class="btn btn-link" @click="logout">Logout</button>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
export default {

  computed: {
    isLoggedIn() {
      return this.$store.getters['login/isLoggedIn'];
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('login/LOGOUT').then(() => {
        this.$router.push('/login');
      });
    }
  },

};
</script>

