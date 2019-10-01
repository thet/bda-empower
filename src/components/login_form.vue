<template>
  <v-form class="login" @submit.prevent="login">
    <v-card>
      <v-card-title>{{ $t('login.title') }}</v-card-title>

      <v-card-text>
        <v-text-field
          required
          v-model="username"
          :label="$t('login.username')"
          :placeholder="$t('login.username_placeholder')"
        />
        <v-text-field
          required
          v-model="password"
          :label="$t('login.password')"
          type="password" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          dark small color="green"
          type="submit"
          @click.stop="login"
        >
          Login
        </v-btn>
      </v-card-actions>

    </v-card>
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
