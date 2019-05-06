<template>
  <div class="viewWrapper" v-if="context['@id']">
    <WorkspaceTabs />

    <button class="em-btn" :class="`em-btn-${workspace}`" @click="addContribution">Add {{ workspace }}</button>
    <div v-if="add" class="article_wrapper">
      <Contribution
          :item="{ '@type': 'Contribution', parent: context, workspace: workspace }"
          @addsavecontribution="addSaveContribution"
          @addcancelcontribution="addCancelContribution"
          />
    </div>

    <Workspace :context="context" :workspace="workspace" />
  </div>
</template>
<script>
import Contribution from '@/components/contribution';
import Workspace from '@/components/workspace';
import WorkspaceTabs from '@/components/workspace_tabs';

export default {

  components: {
    Contribution,
    Workspace,
    WorkspaceTabs
  },

  data: function() {
    return {
      add: false
    };
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
    addContribution() {
      this.add = true;
    },
    addSaveContribution() {
      this.add = false;
      this.$vnode.key = new Date();
    },
    addCancelContribution() {
      this.add = false;
    },
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
