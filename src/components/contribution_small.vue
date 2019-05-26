<template>
    <article class="em-contribution em-contribution--mode_small relative"
      :class="[
        `em-contribution-${item.workspace}`,
        `uid-${item.UID}`,
        `state-${item.review_state || 'private'}`,
        item.is_workspace_root ? 'em-workspace-root' : null
    ]">
      <header class="em-contribution-header">
        <h3 class="em-contribution-title">
          <router-link :to="{ path: makePath(item['@id']) }">
            {{ item.title }}
          </router-link>
        </h3>
        <div class="em-date" v-if="item.created">
          <strong>Erstellt:</strong>
          <time :datetime="item.created">{{ item.created | format_date }}</time>
        </div>
        <div class="em-date" v-if="item.modified">
          <strong>Verändert:</strong>
          <time :datetime="item.modified">{{ item.modified | format_date }}</time>
        </div>
        <footer class="em-editui--over">
          <AddButton v-for="ws of next_ws" :key='`add-${ws}`' :parent="item" :workspace="ws" />
        </footer>
      </header>
    </article>
</template>
<script>
import AddButton from '@/components/buttons/add';
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
