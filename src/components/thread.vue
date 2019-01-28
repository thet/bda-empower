<template>
  <ThreadRecurse v-if="tree.start_path" :path="tree.start_path" />
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';

export default {
  components: {
    ThreadRecurse
  },

  computed: {
    tree() {
      return this.$store.state.context.current_thread;
    }
  },

  methods: {
    load() {
      this.$store.dispatch(
        'context/LOAD_THREAD',
        {
          url: this.$store.state.context.current_context['@components']['thread']['@id']
        }
      );
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    // call again the method if the route changes
    $route: 'load'
  }

};
</script>
