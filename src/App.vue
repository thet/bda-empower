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
  }

};
</script>
