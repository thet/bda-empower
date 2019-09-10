<template>
    <article class="em-contribution em-contribution--mode_smaller relative"
      :class="[
        `em-contribution-${item.workspace}`,
        `uid-${item.UID}`,
        `state-${item.review_state || 'private'}`,
        item.is_workspace_root ? 'em-workspace-root' : null
    ]">
      <header class="em-contribution-header">
        <p class="em-contribution-title">
          <router-link :to="{ path: makePath(item['@id']) }">
            {{ item.title }}
          </router-link>
        </p>
      </header>
      <footer class="em-editui--over">
        <AddButton v-for="ws of next_ws" :key='`add-${ws}`' :parent="item" :content_type="'Contribution'" :workspace="ws" />
      </footer>
    </article>
</template>
<script>
import AddButton from '@/components/buttons/add';
import config from '@/config';
import utils from '@/utils';

export default {

  components: {
    AddButton
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    next_ws() {
      let ws = this.$store.state.workspace.specification;
      return ws[this.item.workspace].next;
    }
  },

  methods: {
    makePath(url) {
      return utils.makePath(url);
    }
  }

};
</script>
