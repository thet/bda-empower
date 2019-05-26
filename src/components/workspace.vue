<template>
  <section class="em-workspace-overview" :class="'em-workspace-' + workspace" v-if="items">
    <div class="em-workspace--group"
        v-for="item in items"
        :key="`thread-${workspace}-${item['@id']}`">
      <section class="em-workspace--previous-item">
        <ContributionSmaller :item="item.previous_workspace" v-if="item.previous_workspace" />
      </section>
      <section class="em-workspace--item">
        <ContributionSmall :item="item" />
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
    ContributionSmall,
    ContributionSmaller
  },

  props: {
    context: {
      type: Object,
      required: true
    },
    workspace: {
      type: String,
      required: true
    }
  },

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
