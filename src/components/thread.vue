<template>
  <ThreadRecurse v-if="tree.start_path" :path="tree.start_path" />
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';

export default {
  components: {
    ThreadRecurse
  },

  props: [
    'context'
  ],

  computed: {
    tree() {
      return this.$store.state.context.current_thread;
    },
  },

  methods: {
    load() {
      this.$store.dispatch(
        'context/LOAD_THREAD',
        {
          url: this.context['@components']['thread']['@id']
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
