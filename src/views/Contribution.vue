<template>
  <div class="viewWrapper">
    <Thread />
  </div>
</template>
<script>
import Thread from '@/components/thread';

export default {
  components: {
    Thread
  },
  props: ['context']
};
</script>
