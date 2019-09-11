<template>
  <div>
    <ThreadRecurseInner
      v-for="(item, cnt) of context.items"
      :key="cnt"
      :item="item"
    />
  </div>
</template>
<script>
import ThreadRecurseInner from '@/components/thread_recurse_inner';

export default {
  name: 'ThreadRecurse', // ``name`` is necessary for recursive calls.

  components: {
    ThreadRecurseInner
  },
  props: {
    context: {
      type: Object,
      required: false
    }
  }
};
</script>
