<template>
  <v-navigation-drawer
    permanent
    dark
    floating
    fill-height
    app
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <FolderNavigation />

    <v-divider></v-divider>

    <v-list class="pt-0" dense>
      <v-list-tile v-if="!isLoggedIn">
        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <router-link v-if="!isLoggedIn" to="login">Login</router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="isLoggedIn">
        <v-list-tile-action>
          <v-icon>person_outline</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <a @click="logout">Logout</a>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>
<script>
import FolderNavigation from '@/components/foldernavigation';

export default {

  components: {
    FolderNavigation
  },

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
  }

};
</script>
