<template>
    <div v-if="context" class="article_wrapper" :class="context.workspace_root ? 'em-workspace-root' : null">
      <Contribution :context="context" @save="() => load({ force: true })" />
      <ContributionSmall v-for="item of next_ws_items" :key="item.UID" :item="item" />
      <Thread v-for="item of thread_items" :key="item.UID" :item="item" />
    </div>
</template>

<script>
import utils from '@/utils';
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
      return this.context.items.filter(it => it.workspace !== ws && !utils.is_inline_type(it));
    },
    thread_items() {
      const ws = this.context.workspace;
      return this.context.items.filter(it => it.workspace === ws && !utils.is_inline_type(it));
    }
  },

  methods: {
    async load(force=false) {
      this.context = await this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'], force: force });
    }
  },

  created() {
    this.load();
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
