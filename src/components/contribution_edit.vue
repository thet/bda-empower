<template>
  <v-form @submit.prevent.stop="save">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
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
          v-model="context.experts_assigned"
          :label="'Zugewiesene Expert*innen'"
          :edit="true"
          :multiple="true"
          :loader="'users/LOAD_ALLOWED_USERS'"
          :loader_context="parent || context.parent"
          />

        <FileUpload
          ref="fileupload"
          :context="context"
          :label="'Files'"
          :edit="true"
          :multiple="true"
          :store_save="'context/SAVE_FILES'"
          :store_load="'context/LOAD_FILES'"
          :store_delete="'context/DELETE_FILE'"
        />
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
        >
          <v-icon dark>{{ icon_save }}</v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-form>
</template>

<script>
import {
  mdiCancel,
  mdiContentSave,
} from '@mdi/js';
import Autocomplete from '@/elements/Autocomplete';
import FileUpload from '@/elements/FileUpload';
import TextEditor from '@/elements/TextEditor';
import TextLine from '@/elements/TextLine';

export default {

  components: {
    Autocomplete,
    FileUpload,
    TextLine,
    TextEditor
  },

  props: {
    context: {
      type: Object,
      required: true
    },
    parent: {
      type: Object,
      required: false
    },
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
    }
  },

  methods: {
    cancel() {
      this.$emit('cancel');
    },
    async save() {
      let ret;
      if (!this.mode_add) {
        ret = await this.$store.dispatch('context/PATCH', { context: this.context });
      } else {
        ret = await this.$store.dispatch('context/POST', {
          parent_url: this.parent['@id'],
          context: this.context
        });
      }
      await this.$refs.fileupload.save_files(ret['@id']);
      this.$bubble('save');
    }
  }

};
</script>
