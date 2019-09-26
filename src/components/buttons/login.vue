<template>
  <div>
  <v-list class="pt-0" dense>
    <v-list-item v-if="!isLoggedIn">
      <v-list-item-action>
        <v-icon>{{ icon_account }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          <button class="btn btn-link" @click="do_login=true">Login</button>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="isLoggedIn">
      <v-list-item-action>
        <v-icon>{{ icon_account_outline }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          <button class="btn btn-link" @click="logout">Logout</button>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <ModalWrapper v-if="do_login">
    <LoginForm @logged_out="close_modal" @logged_in="close_modal" />
  </ModalWrapper>
</div>
</template>

<script>
import {
  mdiAccount,
  mdiAccountOutline,
} from '@mdi/js';
import LoginForm from '@/components/login_form';
import ModalWrapper from '@/components/modal_wrapper';

export default {

  components: {
    LoginForm,
    ModalWrapper
  },

  data: () => ({
    icon_account: mdiAccount,
    icon_account_outline: mdiAccountOutline,
    do_login: false
  }),

  computed: {
    isLoggedIn() {
      return this.$store.getters['login/isLoggedIn'];
    }
  },

  methods: {

    close_modal() {
      this.do_login = false;
    },

    async logout() {
      this.do_login = false;
      await this.$store.dispatch('login/LOGOUT');
      this.$router.push({ name: 'home' }).catch(() => {});
    },

  },

};
</script>

