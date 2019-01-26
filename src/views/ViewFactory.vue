<template>
  <div class="view" :class="[component]">
    <component v-if="context" :is="component" :context="context" />
  </div>
</template>
<script>
import ContributionView from '@/views/ContributionView';
import DefaultView from '@/views/DefaultView';
export default {
  components: {
    ContributionView,
    DefaultView
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

      if (component === 'Case') {
        component = 'Contribution';
      }

      // Fallback component
      if (Object.keys(this.$options.components).indexOf(component + 'View') === -1) {
        component = 'Default';
      }

      return component + 'View';
    }
  },

  methods: {
    load() {
      this.$store.dispatch('context/LOAD_CONTEXT', { path: this.$route.path, expand_thread: true });
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
