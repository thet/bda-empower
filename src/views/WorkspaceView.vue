<template>
  <div class="viewWrapper" v-if="context['@id']">
    <WorkspaceTabs />
    <Workspace :context="context" :workspace="workspace" />
  </div>
</template>
<script>
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
    context() {
      return this.$store.state.context.current_context;
    }
  },

  methods: {
    load() {
      let path = this.$route.path.split('+ws')[0];
      this.$store.dispatch('context/LOAD_CONTEXT', { path: path, set_current: true });
    }
  },

  created() {
    this.load();
  },

  watch: {
    // call again the method if the route changes
    $route: 'load'
  }

};
</script>
