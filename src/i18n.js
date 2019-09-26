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
    },
    workspace: {
      case: 'Case',
      analysis: 'Analysis',
      strategy: 'Strategy',
      action: 'Action',
      evaluation: 'Evaluation',
    },
  },
  de: {
    contribution: {
      add_answer: 'Antworten',
      add_workspace: '{ws} anlegen',
    },
    login: {
      title: 'Anmelden',
    },
    workspace: {
      case: 'Fall',
      analysis: 'Analyse',
      strategy: 'Strategie',
      action: 'Aktion',
      evaluation: 'Evaluierung',
    },
  },
};

export default new VueI18n({
  locale: 'de',
  messages
});
