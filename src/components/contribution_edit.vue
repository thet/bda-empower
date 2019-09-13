<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <v-form @submit.prevent.stop="save">

        <TextLine
          v-model="context.title"
          :label="'Title'"
          :edit="true"
          />

        <TextEditor
          v-model="context.text"
          :label="'Text'"
          :edit="true"
          />

        <Autocomplete
          v-if="false"
          v-model="context.experts_assigned"
          :label="'Zugewiesene Expert*innen'"
          :edit="true"
          :multiple="true"
          :store_getter="'users/allowed_users'"
          :store_loader="'users/LOAD_ALLOWED_USERS'"
          :options_loader="{ url: parent_url }"
          />

      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        fab dark small color="red"
        title="Cancel"
        @click.stop="cancel"
      >
        <v-icon dark>{{ icon_cancel }}</v-icon>
      </v-btn>
      <v-btn
        fab dark small color="green"
        title="Save"
        type="submit"
        @click.stop="save"
      >
        <v-icon dark>{{ icon_save }}</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>
import {
  mdiCancel,
  mdiContentSave,
} from '@mdi/js';
import Autocomplete from '@/elements/Autocomplete';
import TextEditor from '@/elements/TextEditor';
import TextLine from '@/elements/TextLine';
import utils from '@/utils';


export default {

  components: {
    Autocomplete,
    TextLine,
    TextEditor,
  },

  props: {
    context: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      mode_add: !this.context['@id'],
      icon_cancel: mdiCancel,
      icon_save: mdiContentSave
    };
  },

  computed: {
    title() {
      return `${this.mode_add ? 'Add' : 'Edit'} ${this.context['@type']}`;
    },
    parent_url() {
      if (this.context.parent) {
        return this.context.parent['@id'];
      }
      return utils.parentURL(this.context['@id']);
    }
  },

  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async save() {
      if (!this.mode_add) {
        await this.$store.dispatch('context/PATCH', { context: this.context });
      } else {
        await this.$store.dispatch('context/POST', {
          parent_url: this.parent_url,
          context: this.context
        });
      }
      this.$bubble('save');
    }
  }

};
</script>
