<template>
  <div class="em-account-info" v-if="user.fullname">
    <strong>{{ user.fullname }}</strong>
    <p v-if="user.email">{{ user.email }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState({
      user: state => state.login.user,
    })
  }

};
</script>
