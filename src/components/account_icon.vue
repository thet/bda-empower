<template>
  <span class="clickable" :title="`${role} ${account}`" @click="showinfo = !showinfo">
    <v-icon
      dark
      class="em-person"
    >
      {{ icon_account }}
    </v-icon>
    <span v-if="showinfo">{{ `${role} ${account}` }}</span>
  </span>
</template>

<script>
import { mdiAccount } from '@mdi/js';

export default {

  props: {
    account: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },

  data: () => ({
    icon_account: mdiAccount,
    showinfo: false
  }),

};
</script>
