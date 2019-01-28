<template>
  <div>
  <div class="article_wrapper" v-for="item in items" :key="item['@id']">
    <Contribution :item="item" />
    <ThreadRecurse :path="newPath(item)" />
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
    'path',
  ],

  computed: {
    tree() {
      return this.$store.state.context.current_thread;
    },
    items() {
      return this.tree.items[this.path];
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
  .article_wrapper article {
    margin: 2em 0;
    padding: 2em;
    border: 1px solid black;
    border-radius: 2em 0 2em 0;
  }

</style>
