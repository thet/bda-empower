<template>
  <span>
    <v-text-field
        v-if="edit"
        ref="input"
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
    },
    focus: {
      type: Boolean,
      required: false,
      default: false
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
  },

  mounted() {
    if (this.focus) {
      // https://github.com/vuetifyjs/vuetify/issues/1587#issuecomment-326967711
      this.$nextTick(this.$refs.input.focus);
    }
  }

};
</script>
