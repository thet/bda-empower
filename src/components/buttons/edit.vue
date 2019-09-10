<template>
  <div class="em-buttonwrapper">
    <v-btn
      fab
      dark
      small
      color="cyan"
      :title="`Edit ${context['@type']}`"
      @click="open"
    >
      <v-icon dark>{{ icon_edit }}</v-icon>
    </v-btn>
    <ModalWrapper v-if="active">
      <component
        :is="component"
        :context="context"
        @save="close"
        @cancel="close"
      />
    </ModalWrapper>
  </div>
</template>
<script>
import { mdiPencil } from '@mdi/js';
import CaseEdit from '@/components/case_edit';
import ContributionEdit from '@/components/contribution_edit';
import ModalWrapper from '@/components/modal_wrapper';

export default {
  components: {
    CaseEdit,
    ContributionEdit,
    ModalWrapper
  },
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      active: false,
      icon_edit: mdiPencil
    };
  },
  computed: {
    component() {
      return `${this.context['@type']}Edit`;
    }
  },
  methods: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
    }
  }
};
</script>
