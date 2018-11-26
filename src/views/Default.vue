<template>
  <div class="viewWrapper">
    <h1>{{ context.title }}</h1>

    <nav>
      <ul>
        <li v-if="parentPath">
          <router-link :to="{ path: parentPath }">Parent Item</router-link>
        </li>
        <li v-for="item in context.items">
          <router-link :to="{ path: makePath(item['@id']) }">{{ item.title }}</router-link>
        </li>
      </ul>

    </nav>

  </div>
</template>
<script>
import utils from '@/utils';

export default {
  props: ['context'],
  computed: {
    parentPath () {
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
    makePath (uri) {
      return utils.makePath(uri);
    },
  }
}
</script>
