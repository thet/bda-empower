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
import ContributionSmall from '@/components/contribution_small';
import ContributionSmaller from '@/components/contribution_smaller';
import utils from '@/utils';

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
    async load() {
      let url = this.context['@components']['workspace_overview']['@id'];
      try {
        utils.logger.debug(`load workspace items: ${url}, workspace ${this.workspace}`);
        const response = await axios.get(url, { params: { workspace: this.workspace }});
        this.items = response.data.items;
      } catch (error) {
        utils.logger.error(`Error while loading workspace items at: ${url}`);
        utils.logger.error(error);
      }
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    context: 'load',
    workspace: 'load'
  }

};
</script>
