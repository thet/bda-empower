import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Ready translated locale messages
const messages = {
  en: {
    contribution: {
      add_answer: 'Add answer',
      add_workspace: 'Add {ws}',
    },
    login: {
      title: 'Login',
      username: 'User name',
      username_placeholder: 'name@example.org',
      password: 'Password',
    },
    workspace: {
      case: 'Case',
      analysis: 'Analysis',
      strategy: 'Strategy',
      action: 'Action',
      evaluation: 'Evaluation',
    },
    buttons: {
      delete_title: 'Delete {type}',
      delete_ok: 'Delete now',
      delete_cancel: 'Cancel',
      delete_text: 'Do you really want to delete {title}?',
    },
  },
  de: {
    contribution: {
      add_answer: 'Antworten',
      add_workspace: '{ws} anlegen',
    },
    login: {
      title: 'Anmelden',
      username: 'Benutzername',
      username_placeholder: 'name@beispiel.at',
      password: 'Passwort',
    },
    workspace: {
      case: 'Fall',
      analysis: 'Analyse',
      strategy: 'Strategie',
      action: 'Aktion',
      evaluation: 'Evaluierung',
    },
    buttons: {
      delete_title: '{type} löschen',
      delete_ok: 'Jetzt löschen',
      delete_cancel: 'Abbrechen',
      delete_text: 'Möchten sie wirklich {title} löschen?',
    },
  },
};

export default new VueI18n({
  locale: 'de',
  messages
});
