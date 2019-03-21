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
    <span v-if="!edit && value">{{ value }}</span>
  </span>
</template>
<script>
export default {
  props: {
    edit: Boolean,
    label: String,
    value: [String, Array],
    multiple: Boolean,
    store_loader: String,
    store_getter: String
  },
  computed: {
    _value: {
      get() {
        let val_default = this.multiple ? [] : '';
        return this.value || val_default;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    items() {
      return this.$store.getters[this.store_getter];
    }
  },
  watch: {
    edit(newEdit) {
      if (newEdit) {
        this.$store.dispatch(this.store_loader, {});
      }
    }
  }
};
</script>
