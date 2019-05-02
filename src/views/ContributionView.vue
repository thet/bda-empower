<template>
  <div class="viewWrapper">
    <WorkspaceTabs />
    <Thread :context="context" />
  </div>
</template>
<script>
import utils from '@/utils';
import Thread from '@/components/thread';
import WorkspaceTabs from '@/components/workspace_tabs';

export default {

  components: {
    Thread,
    WorkspaceTabs
  },

  props: [
    'context'
  ],

  computed: {
    active_tab: {
      get: function() {
        switch (this.context.workspace) {
          case 'analysis':
            return 1;
          case 'strategy':
            return 2;
          case 'action':
            return 3;
          case 'evaluation':
            return 4;
          default:
            return 0;
        }
      },
      set: function(val) {
        return;
      }

    }
  },

  methods: {
    makePath(url) {
      return utils.makePath(url);
    }
  }

};
</script>
