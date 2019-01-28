<template>
  <div class="viewWrapper">
    <Thread :context="context" />
  </div>
</template>
<script>
import Thread from '@/components/thread';

export default {

  components: {
    Thread
  },

  props: [
    'context'
  ]


};
</script>
