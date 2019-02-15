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
    multiple: Boolean,
    store_loader: String,
    store_getter: String
  },
  computed: {
    _value: {
      get() {
        let val = this.value;
        let val_default = '';
        if (this.multiple) {
          val = val.split(';').filter(it => it);
          val_default = [];
        }
        return val || val_default;
      },
      set(val) {
        if (this.multiple) {
          val = val.join(';');
        }
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
