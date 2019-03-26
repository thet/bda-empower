<template>
  <section class="em-workspace" :class="'em-workspace-' + workspace">
    <ThreadRecurse v-for="path in paths" :path="path" :key="path" :workspace="workspace" />
  </section>
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
    paths() {
      if (! (this.tree && this.tree.items)) {
        return [];
      }
      return Object.keys(this.tree.items).filter(it => {
        let path = it.split('/');
        let parent_path = path.slice(0, path.length - 2).join('/');
        return ! this.tree.items[parent_path];
      });
    },
    tree() {
      return this.$store.state.context.workspace_threads[this.workspace];
    }
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
