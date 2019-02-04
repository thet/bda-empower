<template>
  <div>
    <v-textarea
      v-if="edit"
      :edit="edit"
      :label="label"
      v-model="_value"
    ></v-textarea>
    <div v-if="!edit" v-html="value"></div>
  </div>
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
      set: function(x) {
        this.$emit('input', x);
      }
    }
  }

};
</script>
