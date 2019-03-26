<template>
  <v-icon class="em-person" :title="`${role} ${account}`">person</v-icon>
</template>
<script>
export default {
  props: [
    'account',
    'role'
  ]
}
</script>
