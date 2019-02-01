<template>
  <div id="app">
    <v-app>
      <Toolbar></Toolbar>
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Toolbar from '@/components/toolbar';

export default {

  name: 'app',

  components: {
    Toolbar
  }

};
</script>
