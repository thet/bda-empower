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

        <TextArea
          v-model="context.description"
          :label="'Description'"
          :edit="true"
        />

        <TextEditor
          v-model="context.text"
          :label="'Text'"
          :edit="true"
        />

        <Autocomplete
          v-model="context.client"
          :label="'Klient*in'"
          :edit="true"
          :multiple="true"
          :loader="'users/LOAD_USERS'"
        />

        <Autocomplete
          v-model="context.coordinators"
          :label="'Koordinator*in'"
          :edit="true"
          :multiple="true"
          :loader="'users/LOAD_USERS'"
        />

        <Autocomplete
          v-model="context.expert_pool"
          :label="'Expert*innen Pool'"
          :edit="true"
          :multiple="true"
          :loader="'users/LOAD_USERS'"
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


export default {

  components: {
    Autocomplete,
    TextLine,
    TextEditor
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
          parent_url: this.context.parent['@id'],
          context: this.context
        });
      }
      this.$bubble('save');
    }
  }

};
</script>
