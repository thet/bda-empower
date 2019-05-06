<template>
  <div>
    <button class="em-btn" :class="`em-btn-${workspace}`" @click="addContribution">Add {{ workspace || 'Comment' }}</button>
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
      this.$vnode.parent.key = new Date();
    },
    addCancelContribution() {
      this.add = false;
    }
  }
};
</script>
