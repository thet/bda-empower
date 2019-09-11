<template>
  <Intersect @enter="load">
    <div>
    <div v-if="context" class="article_wrapper" :class="context.is_workspace_root ? 'em-workspace-root' : null">
      <Contribution :context="context" />
      <Thread v-for="(item, cnt) of context.items" :key="cnt" :item="item" />
    </div>
    </div>
  </Intersect>
</template>
<script>
import Intersect from 'vue-intersect'
import Contribution from '@/components/contribution';
import Thread from '@/components/thread';

export default {
  name: 'Thread', // ``name`` is necessary for recursive calls.

  components: {
    Intersect,
    Contribution,
    Thread
  },
  props: {
    item: {
      type: Object,
      required: false
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
  watch: {
    item: 'load' // reload thread when item changes
  }
};
</script>
<style type="scss">
  .article_wrapper .article_wrapper {
    margin-left: 2em;
  }
</style>
