<template>
  <div class="viewWrapper">
    <v-tabs
      color="cyan"
      dark
      slider-color="yellow"
    >

      <v-tab ripple class="em-btn-case">
        Fall
      </v-tab>
      <v-tab-item lazy>
        <Workspace :context="context" :workspace="'case'" />
      </v-tab-item>

      <v-tab ripple class="em-btn-analysis em-bg-analysis">
        Analyse
      </v-tab>
      <v-tab-item lazy>
        <Workspace :context="context" :workspace="'analysis'" />
      </v-tab-item>

      <v-tab ripple class="em-btn-strategy">
        Strategien
      </v-tab>
      <v-tab-item lazy>
        <Workspace :context="context" :workspace="'strategy'" />
      </v-tab-item>

      <v-tab ripple class="em-btn-action">
        Aktionsplan
      </v-tab>
      <v-tab-item lazy>
        <Workspace :context="context" :workspace="'action'" />
      </v-tab-item>

      <v-tab ripple class="em-btn-evaluation">
        Evaluierung
      </v-tab>
      <v-tab-item lazy>
        <Workspace :context="context" :workspace="'evaluation'" />
      </v-tab-item>

    </v-tabs>

  </div>
</template>
<script>
import Workspace from '@/components/workspace';

export default {

  components: {
    Workspace
  },

  props: [
    'context'
  ]

};
</script>

