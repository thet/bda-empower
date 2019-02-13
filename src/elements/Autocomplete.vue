<template>
  <span>
    <v-autocomplete
        v-if="edit"
        v-model="_value"
        :items="items"
        :label="label"
        :multiple="multiple"
        chips
        deletable-chips
        dense
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
    multiple: Boolean
  },
  computed: {
    _value: {
      get() {
        let val = this.value;
        if (this.multiple) {
          val = val.split(';').filter(it => it);
        }
        return val;
      },
      set(val) {
        if (this.multiple) {
          val = val.join(';');
        }
        this.$emit('input', val);
      }
    }
  }
};
</script>
