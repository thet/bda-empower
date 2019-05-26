<template>
  <v-icon class="em-person" :title="`${role} ${account}`">person</v-icon>
</template>
<script>
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
  }
};
</script>
