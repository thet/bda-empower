<template>
  <span class="clickable" :title="`${role} ${user_name}`" @click="showinfo = !showinfo">
    <v-icon
      dark
      class="em-person"
    >
      {{ icon_account }}
    </v-icon>
    <span v-if="showinfo">{{ `${role} ${user_name}` }}</span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';
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

  computed: {
    user_name() {
      const user = this.user_by_id(this.account);
      return user ? user.text : '';
    },
    ...mapGetters({
      user_by_id: 'users/user_by_id',
    })
  },

  created() {
    this.$store.dispatch('users/LOAD_USERS', {});
  }


};
</script>
