<template>
  <div class="viewWrapper">
    <WorkspaceTabs />
    <Thread :context="context" />
  </div>
</template>
<script>
import Thread from '@/components/thread';
import WorkspaceTabs from '@/components/workspace_tabs';

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
    console.log(`ContributionView context id: ${this.context['@id']}`);
  },

};
</script>
