<template>
  <v-app id="app" :key="app_refresh_key">
    <Toolbar></Toolbar>
    <v-content>
      <LoginButton />
      <PortalMessage />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import PortalMessage from '@/components/portal_message';
import Toolbar from '@/components/toolbar';
import LoginButton from '@/components/buttons/login';

export default {
  name: 'app',

  components: {
    PortalMessage,
    Toolbar,
    LoginButton,
  },

  computed: {
    ...mapState({
      app_refresh_key: state => state.app_refresh_key,
    })
  },

  methods: {
    async load() {
      // always get the context. the context is fundamental to plone.
      let path = this.$route.path.split('+')[0].split('?')[0].split('&')[0]; // get the base path.
      this.$store.dispatch('context/LOAD_CONTEXT', { path: path, set_current: true });
    }
  },

  created() {
    this.load();
  },

  watch: {
    $route: 'load',
    app_refresh_key: 'load'
  }
};
</script>
