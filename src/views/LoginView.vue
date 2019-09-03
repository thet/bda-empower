<template>
  <v-form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User Name</label>
    <v-text-field required v-model="username" placeholder="User name" />
    <label>Password</label>
    <v-text-field required v-model="password" type="password" placeholder="Password" />
    <v-btn type="submit">Login</v-btn>
  </v-form>
</template>
<script>
import config from '@/config';
import utils from '@/utils';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },

  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch('login/LOGIN', { username, password })
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          let title = config.portal_messages.LOGIN_ERROR_TITLE;
          let text = config.portal_messages.LOGIN_ERROR_TEXT;
          try {
            title = error.response.data.error.type || `${error.response.status} - ${error.response.statusText}`;
            text = error.response.data.error.message;
          } catch {
            title = `${error.response.status} - ${error.response.statusText}`;
          }
          this.$store.commit('portal_message/ADD_MESSAGE', {
            title: title,
            text: text,
            type: 'error'
          });
          utils.logger.error(error);
        });
    }
  }
};
</script>
