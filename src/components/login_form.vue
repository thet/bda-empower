<template>
  <v-card>
    <v-card-title>{{ $t('login.title') }}</v-card-title>

    <v-card-text>
      <v-form class="login" @submit.prevent="login">
        <h1>Sign in</h1>
        <label>User Name</label>
        <v-text-field required v-model="username" placeholder="User name" />
        <label>Password</label>
        <v-text-field required v-model="password" type="password" placeholder="Password" />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn type="submit">Login</v-btn>

      <v-btn
        fab dark small color="green"
        type="submit"
        @click.stop="login"
      >
        Login
      </v-btn>
    </v-card-actions>

  </v-card>


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
          this.$bubble('logged_in');
          this.$router.push('/cases').catch(() => {});
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
          this.$bubble('login_error');

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
