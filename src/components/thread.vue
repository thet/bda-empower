<template>
  <ThreadRecurse :tree="tree" :path="startPath" />
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';

export default {
  components: {
    ThreadRecurse
  },

  computed: {
    context() {
      return this.$store.state.context.context;
    },
    tree() {
      return this.context['@components'].thread.items;
    },
    startPath() {
      return this.context['@components'].thread.start_path;
    }
  }

};
</script>
