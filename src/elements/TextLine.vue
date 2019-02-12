<template>
  <span>
    <v-text-field
        v-if="edit"
        v-model="_value"
        :label="label"></v-text-field>
    <span v-if="!edit">{{ value }}</span>
  </span>
</template>
<script>
export default {
  props: {
    edit: Boolean,
    label: String,
    value: String
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
