<template>
  <div>
    <div class="article_wrapper" v-for="item in items" :key="item['@id']">
      <Contribution :item="item" />
      <ThreadRecurse v-if="item['@id']" :path="newPath(item)" />
    </div>
  </div>
</template>
<script>
import Contribution from '@/components/contribution';
import ThreadRecurse from '@/components/thread_recurse';

export default {

  name: 'ThreadRecurse', // ``name`` is necessary for recursive calls.

  components: {
    Contribution,
    ThreadRecurse
  },

  props: [
    'path'
  ],

  computed: {
    items() {
      let tree = this.$store.state.context.current_thread;
      return tree.items[this.path];
    }
  },

  methods: {
    newPath(item) {
      let id = item['@id'].split('/').splice(-1); // get last element
      let newPath = this.path + '/' + id[0];
      return newPath;
    }
  }

};
</script>
<style type="scss">
  .article_wrapper .article_wrapper {
    margin-left: 2em;
  }
</style>
