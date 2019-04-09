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
import axios from 'axios';
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

  data: function() {
    return {
      items: []
    };
  },

  methods: {
    load() {
      let url = this.context['@components']['workspace_overview']['@id'];
      axios
        .get(url, { params: { workspace: this.workspace }})
        .then(response => {
          console.log(`load workspace items: ${url}, workspace ${this.workspace}`);
          this.items = response.data.items;
        })
        .catch(error => {
          console.log(`Error while loading workspace items at: ${url}`);
          console.log(error);
        });
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

