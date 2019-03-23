<template>
  <div class="viewWrapper">
    <v-tabs
      color="cyan"
      dark
      slider-color="yellow"
    >

      <v-tab ripple>
        Fall
      </v-tab>
      <v-tab-item>
        <Thread :context="context" :workspace="'case'" />
      </v-tab-item>

      <v-tab ripple>
        Analyse
      </v-tab>
      <v-tab-item>
        <Thread :context="context" :workspace="'analysis'" />
      </v-tab-item>

      <v-tab ripple>
        Strategien
      </v-tab>
      <v-tab-item>
        <Thread :context="context" :workspace="'strategy'" />
      </v-tab-item>

      <v-tab ripple>
        Aktionsplan
      </v-tab>
      <v-tab-item>
        <Thread :context="context" :workspace="'action'" />
      </v-tab-item>

      <v-tab ripple>
        Evaluierung
      </v-tab>
      <v-tab-item>
        <Thread :context="context" :workspace="'evaluation'" />
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
