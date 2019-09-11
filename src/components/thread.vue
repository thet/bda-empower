<template>
  <section class="em-workspace" :class="'em-workspace-' + context.workspace">
    <ThreadRecurse :context="context" />
  </section>
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';

export default {
  components: {
    ThreadRecurse
  },
  props: {
    context: {
      type: Object,
      required: true
    }
  }
};
</script>
