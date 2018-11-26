<template>
  <div class="view" :class="[component]">
    <component v-if="context" :is="component" :context="context" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Default from '@/views/Default';
export default {

  components: {
    Default
  },

  computed: {
    component () {
      if (!this.context) {
        return;
      }
      let component = this.context['@type'];
      if (Object.keys(this.$options.components).indexOf(component) === -1) {
        component = 'Default';
      }
      return component;
    },
    ...mapState(['context'])
  },

  methods: {
    load () {
      this.$store.dispatch('LOAD_CONTEXT', { path: this.$route.path });
    }
  },

  mounted () {
    this.load();
  },

  watch: {
    // call again the method if the route changes
    '$route': 'load'
  },

}
</script>
