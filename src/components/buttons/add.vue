<template>
  <div>
    <v-btn fab dark small
        :class="`em-btn-${workspace}--i`"
        :title="workspace || 'Comment'"
        @click="addContribution">
      <v-icon dark>add</v-icon>
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
      add: false
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
