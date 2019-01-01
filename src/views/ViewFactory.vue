<template>
  <div class="view" :class="[component]">
    <component v-if="context" :is="component" :context="context" />
  </div>
</template>
<script>
import Default from '@/views/Default';
export default {
  components: {
    Default
  },

  computed: {
    context() {
      return this.$store.state.context.context;
    },

    component() {
      if (!this.context) {
        return;
      }

      // Get component name = type
      let component = this.context['@type'];

      // Fallback component
      if (Object.keys(this.$options.components).indexOf(component) === -1) {
        component = 'Default';
      }

      return component;
    }
  },

  methods: {
    load() {
      this.$store.dispatch('context/LOAD_CONTEXT', { path: this.$route.path });
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
