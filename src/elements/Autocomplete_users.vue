<template>
  <Autocomplete v-model="_value" :edit="edit" :label="label" :items="items" />
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
    value: String
  },

  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(x) {
        this.$emit('input', x);
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
