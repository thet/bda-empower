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

    <LoginButton />

  </v-navigation-drawer>
</template>
<script>
import FolderNavigation from '@/components/foldernavigation';
import LoginButton from '@/components/buttons/login';

export default {

  components: {
    FolderNavigation,
    LoginButton
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
