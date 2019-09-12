<template>
  <div class="em-buttonwrapper">
    <v-btn
      fab
      dark
      small
      color="blue"
      :title="`Add ${context['@type']}`"
      @click="open"
    >
      <v-icon dark>{{ icon_add }}</v-icon>
    </v-btn>
    <ModalWrapper v-if="active">
      <component
        :is="component"
        :context="context"
        @save="context_saved"
        @cancel="close"
      />
    </ModalWrapper>
  </div>
</template>
<script>
import { mdiPlus } from '@mdi/js';
import config from '@/config';
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
    parent: {
      type: Object,
      required: true
    },
    content_type: {
      type: String,
      required: false,
      default: null
    },
    workspace: {
      type: String,
      required: false,
      default: null
    }
  },
  data: function() {
    return {
      active: false,
      icon_add: mdiPlus
    };
  },
  computed: {
    _content_type() {
      return this.content_type ? this.content_type : this.parent['@type'];
    },
    context() {
      const _workspace = this.workspace ? this.workspace : this.parent.workspace;
      const context = new config[`${this._content_type}Model`]({
        parent: this.parent,
        workspace: _workspace
      });
      return context;
    },
    component() {
      return `${this._content_type}Edit`;
    }
  },
  methods: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
    },
    context_saved() {
      this.active = false;
      this.$emit('context_saved');
    }
  }
};
</script>
