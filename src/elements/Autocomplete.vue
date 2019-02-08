<template>
  <span>
    <v-autocomplete
        v-if="edit"
        v-model="_value"
        :items="items"
        :label="label"
        box
        chips
        multiple
      ></v-autocomplete>
    <span v-if="!edit">{{ value }}</span>
  </span>
</template>
<script>
export default {
  props: {
    edit: Boolean,
    label: String,
    value: String,
    items: Array,
  },
  computed: {
    //_value() {
    //  return this.value;
    //},
    _value: {
      get() {
        return this.value;
      },
      set(x) {
        this.$emit('input', x);
      }
    }
  }
};
</script>
