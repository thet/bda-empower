<template>
  <v-icon
    dark
    class="em-person"
    :title="`${role} ${account}`"
  >
    {{ icon_account }}
  </v-icon>
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
    icon_account: mdiAccount
  }),
};
</script>
