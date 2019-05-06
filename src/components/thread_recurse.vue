<template>
  <div v-if="item">
    <div class="article_wrapper" :class="item.is_workspace_root ? 'em-workspace-root' : null">
      <Contribution :item="item" @addcontribution="addContribution" />
      <div v-if="add" class="article_wrapper">
        <Contribution
            :item="{ '@type': 'Contribution', 'parent': item }"
            @addcontribution="addContribution"
            @addsavecontribution="addSaveContribution"
            @addcancelcontribution="addCancelContribution"
            />
      </div>
      <ThreadRecurse v-for="(path, cnt) of subpaths" :path="path" :tree="tree" :key="cnt" />
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

  props: {
    tree: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },

  data: function() {
    return {
      add: false
    }
  },

  computed: {
    item() {
      return this.tree.items[this.path];
    },
    subpaths() {
      const path_length = this.path.split('/').length;
      return Object.keys(this.tree.items).filter(it => {
        // narrow down to only those in current path
        if (it.indexOf(this.path) !== -1) {
          // narrow down to only direct children of current item
          return it.split('/').length === path_length + 1;
        }
        return false;
      });
    }
  },

  methods: {
    addContribution() {
      this.add = true;
    },
    addSaveContribution() {
      this.add = false;
      this.$vnode.key = new Date();
    },
    addCancelContribution() {
      this.add = false;
    }
  }

};
</script>
<style type="scss">
  .article_wrapper .article_wrapper {
    margin-left: 2em;
  }
</style>
