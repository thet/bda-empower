<template>
  <v-list class="pt-0" dense>
    <v-list-item v-if="!isLoggedIn">
      <v-list-item-action>
        <v-icon>{{ icon_account }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          <router-link v-if="!isLoggedIn" :to="'login'" :replace="true" :append="false">Login</router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="isLoggedIn">
      <v-list-item-action>
        <v-icon>{{ icon_account_outline }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          <button class="btn btn-link" @click="logout">Logout</button>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
import { mdiAccount, mdiAccountOutline } from '@mdi/js';

export default {

  data: () => ({
    icon_account: mdiAccount,
    icon_account_outline: mdiAccountOutline
  }),

  computed: {
    isLoggedIn() {
      return this.$store.getters['login/isLoggedIn'];
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('login/LOGOUT').then(() => {
        this.$router.push('login');
      });
    }
  },

};
</script>

