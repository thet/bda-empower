<template>
  <ThreadRecurse v-if="tree.start_path" :path="tree.start_path" :workspace="workspace" />
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';

export default {
  components: {
    ThreadRecurse
  },

  props: [
    'context',
    'workspace'
  ],

  computed: {
    tree() {
      return this.$store.state.context.workspace_threads[this.workspace];
    },
  },

  methods: {
    load() {
      this.$store.dispatch(
        'context/LOAD_THREAD',
        {
          url: this.context['@components']['thread']['@id'],
          workspace: this.workspace
        }
      );
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    // load thread when context changes
    context: 'load'
  }

};
</script>
