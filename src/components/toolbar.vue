<template>
  <v-navigation-drawer
    permanent
    dark
    floating
    fill-height
    app
  >
    <AccountInfo />
    <v-divider></v-divider>
    <FolderNavigation />
    <v-divider></v-divider>
    <LoginButton />
  </v-navigation-drawer>
</template>

<script>
import AccountInfo from '@/components/account_info';
import FolderNavigation from '@/components/foldernavigation';
import LoginButton from '@/components/buttons/login';

export default {

  components: {
    AccountInfo,
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
        this.$router.push('login');
      });
    }
  }

};
</script>
