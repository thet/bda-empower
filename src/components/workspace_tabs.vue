<template>

  <nav class="em-workspace-tabs" :class="`em-workspace-tabs-${current_workspace}`">
    <router-link class="em-btn"
      v-for="ws of workspaces"
      :key="`workspace-tab-${ws.id}`"
      :to="{ path: ws_path(ws.id)  }"
      :class="[`em-btn-${ws.id}`, {active: current_workspace === ws.id}]">{{ ws.title }}</router-link>
  </nav>

</template>
<script>
import { mapState } from 'vuex';
import utils from '@/utils';

export default {

  computed: {
    current_workspace() {
      return this.$route.params.workspace || this.current_context.workspace;
    },
    workspaces() {
      return [
        { id: 'case',       title: 'Fall' },
        { id: 'analysis',   title: 'Analyse' },
        { id: 'strategy',   title: 'Strategie' },
        { id: 'action',     title: 'Aktion' },
        { id: 'evaluation', title: 'Evaluierung' }
      ];
    },
    ...mapState({
      current_case: state => state.context.current_case,
      current_context: state => state.context.current_context
    })
  },

  methods: {
    ws_path(ws_id) {
      return `${utils.makePath(this.current_case['@id'])}/+ws/${ws_id}`;
    },
  }

};
</script>
