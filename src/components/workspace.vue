<template>
  <section class="em-workspace" :class="'em-workspace-' + workspace" v-if="items">
    <div class="workspace_overview"
        :class="item.is_workspace_root ? 'em-workspace-root' : null"
        v-for="item in items"
        :key="`thread-${workspace}-${item['@id']}`">
      <section class="em-workspace--previous-item">
        <Contribution :item="item.previous_workspace" :mode="'smaller'" v-if="item.previous_workspace" />
      </section>
      <section class="em-workspace--item">
        <Contribution :item="item" :mode="'small'" />
      </section>
      <section class="em-workspace--next-items" v-if="item.next_workspaces">
        <Contribution :item="next" :mode="'smaller'" v-for="(next, cnt) in item.next_workspaces" :key="cnt" />
      </section>
    </div>
  </section>
</template>
<script>
import Contribution from '@/components/contribution';
import utils from '@/utils';

export default {
  components: {
    Contribution
  },

  props: [
    'context',
    'workspace'
  ],

  computed: {
    items() {
      let tree = this.tree[this.workspace];
      if (!tree || !tree.items) {
        return [];
      }
      let items = Object.values(tree.items).filter(it => {
        let path = it['@id'].split('/');
        let parent_path = path.slice(0, path.length - 2).join('/');
        return ! tree.items[parent_path];
      });
      return items;
    },
    tree() {
      let tree = this.$store.state.context.workspace_threads;
      return tree || {};
    }
  },

  methods: {
    load() {
      this.$store.dispatch(
        'context/LOAD_THREAD',
        {
          url: this.context['@components']['thread']['@id'],
          workspace: this.workspace
        }
      );
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    // load thread when context changes
    context: 'load'
  }

};
</script>

