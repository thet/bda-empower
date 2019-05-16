<template>
  <section class="em-workspace-overview" :class="'em-workspace-' + workspace" v-if="items">
    <div class="em-workspace--group"
        v-for="item in items"
        :key="`thread-${workspace}-${item['@id']}`">
      <section class="em-workspace--previous-item">
        <ContributionSmaller :item="item.previous_workspace" v-if="item.previous_workspace" />
        <AddButton :parent="item.previous_workspace" :workspace="workspace" />
      </section>
      <section class="em-workspace--item">
        <ContributionSmall :item="item" />
        <nav class="em-editui">
          <AddButton v-for="ws of next_ws" :key='`add-${ws}`' :parent="item" :workspace="ws" />
        </nav>
      </section>
      <section class="em-workspace--next-items" v-if="item.next_workspaces">
        <ContributionSmaller :item="next" v-for="(next, cnt) in item.next_workspaces" :key="cnt" />
      </section>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
import AddButton from '@/components/buttons/add';
import ContributionSmall from '@/components/contribution_small';
import ContributionSmaller from '@/components/contribution_smaller';


export default {
  components: {
    AddButton,
    ContributionSmall,
    ContributionSmaller
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

  computed: {

    next_ws() {
      let ws = this.$store.state.workspace.specification;
      return ws[this.workspace].next;
    }


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

