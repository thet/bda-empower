<template>
  <div id="app">
    <v-app>
      <Toolbar></Toolbar>
      <v-content>
        <PortalMessage />
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import PortalMessage from '@/components/portal_message';
import Toolbar from '@/components/toolbar';

export default {

  name: 'app',

  components: {
    PortalMessage,
    Toolbar
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
    $route: 'load'  // call again the method if the route changes
  }

};
</script>
