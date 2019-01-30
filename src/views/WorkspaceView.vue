<template>
  <div class="viewWrapper">
    <Thread v-if="context['@components']" :context="context" />
  </div>
</template>
<script>
import Thread from '@/components/thread';

export default {

  components: {
    Thread
  },

  computed: {
    context() {
      return this.$store.state.context.current_context;
    }
  },

  methods: {
    load() {
      let path = this.$route.path.split('+ws')[0];
      this.$store.dispatch('context/LOAD_CONTEXT', { path: path, workspace: this.$route.params.id });
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
