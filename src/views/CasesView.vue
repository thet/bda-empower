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
      let workspace_threads = this.$store.state.context.workspace_threads;
      let path = utils.makePath(this.context['@id']);
      return workspace_threads[this.workspace] && workspace_threads[this.workspace].items[path] || [];
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

  created() {
    this.load();
  }

};
</script>
