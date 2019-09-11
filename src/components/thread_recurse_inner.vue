<template>
  <div
    v-if="context"
    class="article_wrapper"
    :class="context.is_workspace_root ? 'em-workspace-root' : null"
  >
    <Contribution :context="context" />
    <ThreadRecurse :context="context" />
  </div>
</template>
<script>
import Intersect from 'vue-intersect'
import Contribution from '@/components/contribution';
import ThreadRecurse from '@/components/thread_recurse';

export default {
  name: 'ThreadRecurseInner',

  components: {
    Intersect,
    Contribution,
    ThreadRecurse
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    context: null
  }),

  methods: {
    async load() {
      this.context = await this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'] });
    }
  },

  mounted() {
    this.load();
  }

};
</script>
<style type="scss">
  .article_wrapper .article_wrapper {
    margin-left: 2em;
  }
</style>
