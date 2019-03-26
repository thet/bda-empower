<template>
  <div>
    <div class="article_wrapper" :class="item.is_workspace_root ? 'em-workspace-root' : null" v-for="item in items" :key="`thread-${workspace}-${item['@id']}`">
      <Contribution :item="item" @addcontribution="addContribution" />
      <div v-if="add" class="article_wrapper">
        <Contribution :item="{ '@type': 'Contribution', 'parent': item }" @addcontribution="addContribution" />
      </div>
      <ThreadRecurse v-if="item['@id']" :path="newPath(item)" :workspace="workspace" />
    </div>
  </div>
</template>
<script>
import Contribution from '@/components/contribution';
import ThreadRecurse from '@/components/thread_recurse';

export default {

  name: 'ThreadRecurse', // ``name`` is necessary for recursive calls.

  components: {
    Contribution,
    ThreadRecurse
  },

  props: [
    'path',
    'workspace'
  ],

  data: function() {
    return {
      add: false
    }
  },

  computed: {
    items() {
      let tree = this.$store.state.context.workspace_threads[this.workspace];
      return tree.items[this.path];
    }
  },

  methods: {
    newPath(item) {
      let id = item['@id'].split('/').splice(-1); // get last element
      let newPath = this.path + '/' + id[0];
      return newPath;
    },
    addContribution() {
      this.add = true;
    }
  }

};
</script>
<style type="scss">
  .article_wrapper .article_wrapper {
    margin-left: 2em;
  }
</style>
