<template>
  <Autocomplete v-model="_value" :edit="edit" :label="label" :items="items" :multiple="multiple" />
</template>
<script>
import Autocomplete from '@/elements/Autocomplete';

export default {

  components: {
    Autocomplete
  },

  props: {
    edit: Boolean,
    label: String,
    value: String,
    multiple: Boolean
  },

  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    items() {
      return this.$store.getters['users/users'];
    }
  },

  mounted() {
    this.$store.dispatch('users/LOAD_USERS', {});
  }

};
</script>
