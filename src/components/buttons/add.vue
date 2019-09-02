<template>
  <div>
    <v-btn fab dark small
        :class="`em-btn-${workspace}--i`"
        :title="workspace || 'Comment'"
        @click="addContribution">
      <v-icon dark>{{ icon_add }}</v-icon>
    </v-btn>
    <div v-if="add" class="add-form overlay">
      <Contribution
          :item="{ '@type': ctype, parent: parent, workspace: workspace }"
          @addsavecontribution="addSaveContribution"
          @addcancelcontribution="addCancelContribution"
          />
    </div>
  </div>
</template>
<script>
import { mdiPlus } from '@mdi/js';
import Contribution from '@/components/contribution';

export default {
  components: {
    Contribution,
  },

  props: {
    parent: {
      type: Object,
      required: true
    },
    ctype: {
      type: String,
      required: false,
      default: 'Contribution'
    },
    workspace: {
      type: String,
      required: false,
      default: ''
    },
  },

  data: function() {
    return {
      add: false,
      icon_add: mdiPlus,
    };
  },

  methods: {
    addContribution() {
      this.add = true;
    },
    addSaveContribution() {
      this.add = false;
      // TODO: check, if necessary
      this.$parent.$vnode.key = new Date(); // Force re-render
    },
    addCancelContribution() {
      this.add = false;
    }
  }
};
</script>
