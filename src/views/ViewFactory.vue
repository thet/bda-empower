<template>
  <div class="view" :class="[component]">
    <component v-if="context" :is="component" :context="context" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CasesView from '@/views/CasesView';
import CaseView from '@/views/CaseView';
import ContributionView from '@/views/ContributionView';
import DefaultView from '@/views/DefaultView';
import utils from '@/utils';

export default {

  components: {
    CasesView,
    CaseView,
    ContributionView,
    DefaultView
  },

  computed: {
    component() {
      if (!this.context) {
        return;
      }

      // Get component name = type
      let component = this.context['@type'];

      // Use contribution View for "Case"
      if (component === 'Case') {
        component = 'Contribution';
      }

      // Fallback component
      if (Object.keys(this.$options.components).indexOf(component + 'View') === -1) {
        component = 'Default';
      }

      let view_name = component + 'View';
      utils.logger.debug(`Using view ${view_name}`);
      return view_name;
    },

    ...mapState({
      context: state => state.context.current_context
    })
  }

};
</script>
