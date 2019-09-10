import Vue from 'vue';
import Vuetify, {
  VApp,
  VAutocomplete,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VContent,
  VDialog,
  VDivider,
  VForm,
  VIcon,
  VLayout,
  VList,
  VListItem,
  VListItemAction,
  VListItemContent,
  VListItemTitle,
  VNavigationDrawer,
  VSpacer,
  VTextField,
  VTextarea,
} from 'vuetify/lib'


const opts = {
  components: {
    VApp,
    VAutocomplete,
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VContent,
    VDialog,
    VDivider,
    VForm,
    VIcon,
    VLayout,
    VList,
    VListItem,
    VListItemAction,
    VListItemContent,
    VListItemTitle,
    VNavigationDrawer,
    VSpacer,
    VTextField,
    VTextarea,
  },
  icons: {
    iconfont: 'mdiSvg',
  },
};

Vue.use(Vuetify, opts);

export default new Vuetify();
