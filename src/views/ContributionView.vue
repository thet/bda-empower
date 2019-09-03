<template>
  <div class="viewWrapper">
    <WorkspaceTabs />
    <Thread :context="context" />
  </div>
</template>
<script>
import Thread from '@/components/thread';
import WorkspaceTabs from '@/components/workspace_tabs';
import utils from '@/utils';

export default {

  components: {
    Thread,
    WorkspaceTabs
  },

  props: {
    context: {
      type: Object,
      required: true
    }
  },

  mounted() {
    utils.logger.debug(`ContributionView context id: ${this.context['@id']}`);
  },

};
</script>
