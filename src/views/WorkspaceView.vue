<template>
  <div class="viewWrapper" v-if="context['@id']">
    <WorkspaceTabs />
    <Workspace :context="context" :workspace="workspace" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Workspace from '@/components/workspace';
import WorkspaceTabs from '@/components/workspace_tabs';

export default {

  components: {
    Workspace,
    WorkspaceTabs
  },

  computed: {
    workspace() {
      return this.$route.params.workspace;
    },
    ...mapState({
      context: state => state.context.current_context
    })
  }

};
</script>
