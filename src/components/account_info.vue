<template>
  <div class="em-account-info" v-if="user.fullname">
    <strong>{{user.fullname}}</strong>
    <p v-if="description">{{description}}</p>
    <p v-if="roles">{{roles}}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    description() {
      return [this.user.description, this.user.email].map(it => it).join(', ');
    },
    roles() {
      return this.user.roles.join(', ');
    },
    ...mapState({
      user: state => state.login.user,
    })
  }
};

</script>
