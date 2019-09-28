<template>
  <div class="em-buttonwrapper">
    <slot></slot>
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
        :parent="parent"
        @save="close"
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
      context: null,
      icon_add: mdiPlus
    };
  },

  computed: {
    _content_type() {
      return this.content_type ? this.content_type : this.parent['@type'];
    },
    component() {
      return `${this._content_type}Edit`;
    }
  },

  methods: {
    set_context() {
      const _workspace = this.workspace ? this.workspace : this.parent.workspace;
      const context = new config[`${this._content_type}Model`]({
        workspace: _workspace
      });
      this.context = context;
    },
    open() {
      this.set_context();
      this.active = true;
    },
    close() {
      this.active = false;
    }
  },

  created() {
    this.set_context();
  },

};
</script>
