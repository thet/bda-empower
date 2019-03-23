<template>
  <div class="viewWrapper">
    <Contribution v-for="item in items" :key="item['@id']" :item="item" />
  </div>
</template>
<script>
import Contribution from '@/components/contribution';
import utils from '@/utils';

export default {

  components: {
    Contribution
  },

  props: [
    'context'
  ],

  computed: {
    items() {
      let path = utils.makePath(this.context['@id']);
      return this.tree && this.tree.items[path] || [];
    },
    tree() {
      return this.$store.state.context.workspace_threads[this.workspace];
    }
  },

  methods: {
    load() {
      this.$store.dispatch(
        'context/LOAD_THREAD',
        {
          url: this.context['@components']['thread']['@id'],
          workspace: 'case'
        }
      );
    }
  },

  mounted() {
    this.load();
  },

};
</script>
