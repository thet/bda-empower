<template>
  <v-list class="pt-0" dense>
    <v-list-tile v-if="parentPath">
      <v-list-tile-action>
        <v-icon>arrow_back</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>
          <router-link :to="{ path: parentPath }">Parent Item</router-link>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile v-for="item in context.items" :key="item.UUID">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          <router-link :to="{ path: makePath(item['@id']) }">
            {{ item.title }}
          </router-link>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
import utils from '@/utils';

export default {
  computed: {
    context() {
      return this.$store.state.context.current_context;
    },

    parentPath() {
      // Create path to parent directory
      let path = this.$route.path.split('/');
      if (this.$route.path === '/' || path.length < 2) {
        return null;
      }
      path.splice(-1, 1);
      return path.join('/') || '/';
    }
  },

  methods: {
    makePath(uri) {
      return utils.makePath(uri);
    }
  }

};
</script>
