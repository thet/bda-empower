<template>

  <nav class="em-workspace-tabs">
    <a class="em-btn"
      v-for="ws of workspaces"
      :key="`workspace-tab-${ws.id}`"
      :class="`em-btn-${ws.id}`"
      :href="`${base_url}/${ws.id}`">{{ ws.title }}</a>
  </nav>

</template>
<script>
import { mapState } from 'vuex';
import utils from '@/utils';


export default {
  computed: {
    base_url() {
      return `${utils.makePath(this.current_case['@id'])}/+ws`;
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
      current_case: state => state.context.current_case
    })
  }
};

</script>
