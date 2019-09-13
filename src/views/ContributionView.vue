<template>
  <div class="viewWrapper">
    <WorkspaceTabs />
    <section class="em-workspace" :class="'em-workspace-' + context.workspace">
      <Thread :item="context" />
    </section>
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
  }

};
</script>
