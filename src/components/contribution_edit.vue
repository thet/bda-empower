<template>
  <div>
    <FormSchema v-if="schema" :schema="schema" v-model="model" @submit="submit">
      <button type="submit">Save</button>
    </FormSchema>
  </div>
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
    submit() {
      this.$store.dispatch('context/PATCH', { url: this.context['@id'], model: this.model });
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    // call again the method if the route changes
    $route: 'load'
  }


};
</script>