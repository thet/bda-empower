<template>
  <span>
    <v-text-field
        v-if="edit"
        v-model="_value"
        :label="label"></v-text-field>
    <span v-if="!edit && value">{{ value }}</span>
  </span>
</template>

<script>
export default {

  props: {
    value: {
      type: String,
      required: true
    },
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    _value: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit('input', val);
      }
    }
  }

};
</script>
