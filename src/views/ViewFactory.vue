<template>
  <div class="view" :class="[component]">
    <component v-if="context" :is="component" :context="context" />
  </div>
</template>
<script>
import CasesView from '@/views/CasesView';
import CaseView from '@/views/CaseView';
import ContributionView from '@/views/ContributionView';
import DefaultView from '@/views/DefaultView';
export default {
  components: {
    CasesView,
    CaseView,
    ContributionView,
    DefaultView
  },

  computed: {
    context() {
      return this.$store.state.context.current_context;
    },

    component() {
      if (!this.context) {
        return;
      }

      // Get component name = type
      let component = this.context['@type'];

      // Fallback component
      if (Object.keys(this.$options.components).indexOf(component + 'View') === -1) {
        component = 'Default';
      }

      let view_name = component + 'View';
      console.log(`Using view ${view_name}`);
      return view_name;
    }
  },

  methods: {
    load() {
      this.$store.dispatch('context/LOAD_CONTEXT', { path: this.$route.path, set_current: true });
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
