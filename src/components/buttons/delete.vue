<template>
  <div class="em-buttonwrapper">
    <slot></slot>
    <v-btn
      fab
      dark
      small
      color="red"
      :title="`Delete ${context['@type']}`"
      @click="open"
    >
      <v-icon dark>{{ icon_delete }}</v-icon>
    </v-btn>
    <ModalWrapper v-if="active">
      <div>
        <v-card>
          <v-card-title>{{ $t('buttons.delete_title', { type: context['@type'] }) }}</v-card-title>
          <v-card-text>{{ $t('buttons.delete_text', { title: context.title } ) }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              fab dark small color="green"
              title="Cancel"
              v-focus
              @click.stop="close"
            >
              <v-icon dark>{{ icon_cancel }}</v-icon>
            </v-btn>
            <v-btn
              fab dark small color="red"
              title="Delete"
              @click.stop="delete_item"
            >
              <v-icon dark>{{ icon_delete }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </ModalWrapper>
  </div>
</template>
<script>
import {
    mdiCancel,
    mdiTrashCan
} from '@mdi/js';
import ModalWrapper from '@/components/modal_wrapper';

export default {

  components: {
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
      icon_cancel: mdiCancel,
      icon_delete: mdiTrashCan,
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
    },
    async delete_item() {
      await this.$store.dispatch('context/DELETE', { context: this.context });
      this.active = false;
      this.$bubble('delete');
    }
  }

};
</script>
