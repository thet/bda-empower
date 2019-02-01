<template>
  <div class="viewWrapper">
    <v-tabs
      color="cyan"
      dark
      slider-color="yellow"
  >
      <v-tab ripple>
        Analyse
      </v-tab>
      <v-tab-item>
        <Thread :context="context" />
      </v-tab-item>

      <v-tab ripple>
        Strategien
      </v-tab>
      <v-tab-item>
        Strategien
      </v-tab-item>

      <v-tab ripple>
        Aktionsplan
      </v-tab>
      <v-tab-item>
        Evaluierung
      </v-tab-item>

      <v-tab ripple>
        Evaluierung
      </v-tab>
      <v-tab-item>
        Evaluierung
      </v-tab-item>

    </v-tabs>

  </div>
</template>
<script>
import Thread from '@/components/thread';

export default {

  components: {
    Thread
  },

  props: [
    'context'
  ]


};
</script>
