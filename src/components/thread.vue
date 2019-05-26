<template>
  <section class="em-workspace" :class="'em-workspace-' + context.workspace">
    <ThreadRecurse v-if="tree && tree.items" :tree="tree" :path="path" />
  </section>
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';
import utils from '@/utils';
import axios from 'axios';


export default {
  components: {
    ThreadRecurse
  },

  props: {
    context: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return {
      tree: {}
    }
  },

  computed: {
    path() {
      return utils.makePath(this.context['@id']);
    }
  },

  methods: {
    load() {
      const url = this.context['@components']['thread']['@id'];
      axios
        .get(
          url,
          { params: { workspace: this.context.workspace }}
        )
        .then(response => {
          console.log(`loading thread: ${url}, workspace ${this.context.workspace}, context id: ${this.context['@id']}`);
          this.tree = response.data;
        })
        .catch(error => {
          console.log(`Error while loading thread at: ${url}`);
          console.log(error);
        });
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    // load thread when context changes
    context: 'load'
  }

};
</script>
