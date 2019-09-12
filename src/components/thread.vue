<template>
  <Intersect @enter="load">
    <div>
    <div v-if="context" class="article_wrapper" :class="context.workspace_root ? 'em-workspace-root' : null">
      <Contribution :context="context" />
      <ContributionSmall v-for="(item, cnt) of next_ws_items" :key="cnt" :item="item" />
      <Thread v-for="(item, cnt) of thread_items" :key="cnt" :item="item" />
    </div>
    </div>
  </Intersect>
</template>
<script>
import Intersect from 'vue-intersect'
import Contribution from '@/components/contribution';
import ContributionSmall from '@/components/contribution_small';
import Thread from '@/components/thread';

export default {
  name: 'Thread', // ``name`` is necessary for recursive calls.

  components: {
    Intersect,
    Contribution,
    ContributionSmall,
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
  computed: {
    next_ws_items() {
      const ws = this.context.workspace;
      return this.context.items.filter(it => it.workspace !== ws);
    },
    thread_items() {
      const ws = this.context.workspace;
      return this.context.items.filter(it => it.workspace === ws);
    }
  },
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
