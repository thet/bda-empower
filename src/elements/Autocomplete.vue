<template>
  <span>
    <v-autocomplete
        v-if="edit"
        v-model="_value"
        :items="items_"
        :label="label"
        :multiple="multiple"
        :menu-props="{ closeOnContentClick: true }"
        chips
        deletable-chips
        dense
      ></v-autocomplete>
    <span v-if="!edit && value">{{ value }}</span>
  </span>
</template>

<script>
import utils from '@/utils';

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
    items: {
      type: Array,
      required: false,
      default: null
    },
    loader: {
      type: String,
      required: false,
      default: null
    },
    loader_context: {
      type: Object,
      required: false
    }
  },

  data: function() {
    return {
      items_: null
    };
  },

  computed: {
    _value: {
      get() {
        let val_default = this.multiple ? [] : '';
        return this.value ? this.value : val_default;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },

  methods: {
    async load() {
      let options = {};
      if (this.loader_context) {
        options.url = this.loader_context['@id'];
      }
      let items = await this.$store.dispatch(this.loader, options);
      this.items_ = utils.items_from_vocab(items);
    }
  },

  mounted() {
    if (this.items) {
      this.items_ = this.items;
    } else {
      this.load();
    }
  }

};
</script>
