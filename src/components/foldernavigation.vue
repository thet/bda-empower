<template>
  <v-list class="pt-0" dense>
    <v-list-item v-if="parentPath">
      <v-list-item-action>
        <v-icon>{{ icon_back }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          <router-link :to="{ path: parentPath }">Parent Item</router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-for="item in context.items" :key="item.UUID">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <router-link :to="{ path: makePath(item['@id']) }">
            {{ item.title }}
          </router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';
import { mdiArrowLeft } from '@mdi/js';
import utils from '@/utils';

export default {

  data: () => ({
    icon_back: mdiArrowLeft
  }),

  computed: {
    parentPath() {
      // Create path to parent directory
      let path = this.$route.path.split('/');
      if (this.$route.path === '/' || path.length < 2) {
        return null;
      }
      path.splice(-1, 1);
      return path.join('/') || '/';
    },

    ...mapState({
      context: state => state.context.current_context
    })
  },

  methods: {
    makePath(uri) {
      return utils.makePath(uri);
    }
  }

};
</script>
