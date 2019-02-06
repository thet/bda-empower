<template>
  <v-layout v-if="schema" row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <FormSchema :schema="schema" v-model="model" @submit="save">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog=false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </FormSchema>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import FormSchema from '@formschema/native'
import utils from '@/utils';

export default {

  components: {
    FormSchema
  },

  props: [
    'context'
  ],

  data: function() {
    return {
      dialog: true, // Edit button already clicked
      model: JSON.parse(JSON.stringify(this.context)),
      schema_props: {
        'Contribution': [
          'title',
          'text',
          'experts_assigned'
        ],
        'Case': [
          'title',
          'description',
          'text',
          'client',
          'coordinators',
          'expert_pool'
        ]
      }
    }
  },

  computed: {
    schema: function() {
      let type = this.$store.getters['types/types'][this.context['@type']];
      let schema = false;
      if (!type || !type.schema) {
        return false;
      }
      schema = JSON.parse(JSON.stringify(type.schema));
      let new_schema = {};
      let schema_props = this.schema_props[this.context['@type']];
      for (let i = 0; i < schema_props.length; i++) {
        let prop = schema_props[i];
        if (prop in schema.properties) {
          new_schema[prop] = schema.properties[prop];
        }
      }
      schema.properties = new_schema;
      return schema;
    }
  },

  methods: {
    makePath(url) {
      return utils.makePath(url);
    },
    load() {
      this.$store.dispatch('types/LOAD_TYPE', { url: this.context['@id'], type: this.context['@type'] });
    },
    save() {
      this.$store.dispatch('context/PATCH', { url: this.context['@id'], model: this.model });
      this.dialog = false;
    }
  },

  created() {
    this.load();
  },

  watch: {
    context: 'load'
  }

};
</script>
