<template>
  <v-navigation-drawer
    permanent
    dark
    floating
    fill-height
    app
  >
    <AccountInfo :class="'em-toolbar-content'"/>
    <v-divider></v-divider>
    <FolderNavigation :class="'em-toolbar-content'" />
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import AccountInfo from '@/components/account_info';
import FolderNavigation from '@/components/foldernavigation';

export default {

  components: {
    AccountInfo,
    FolderNavigation,
  },

};
</script>
