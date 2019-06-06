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
    value: {
      type: [String, Array],
      required: true
    },
    // from here on, only required if edit is true.
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    store_loader: {
      type: String,
      required: false,
      default: null
    },
    store_getter: {
      type: String,
      required: false,
      default: null
    },
    options_loader: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data: function() {
    return {
      items_: []
    };
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
      if (! this.items_.length) {
        this.$store.dispatch(this.store_loader, this.options_loader || {}).then(() => {
          this.items_ = this.$store.getters[this.store_getter];
        });
      }
      return this.items_;
    }

  }

};
</script>
