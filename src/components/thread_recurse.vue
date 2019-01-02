<template>
  <ul>
    <li v-for="item in items" :key="item['@id']">
      {{ item.title }}
      <ThreadRecurse :tree="tree" :path="newPath(item)" />
    </li>
  </ul>
</template>
<script>
import ThreadRecurse from '@/components/thread_recurse';

export default {

  name: 'ThreadRecurse', // ``name`` is necessary for recursive calls.

  components: {
    ThreadRecurse
  },

  props: [
    'path',
    'tree'
  ],

  computed: {
    items() {
      return this.tree[this.path];
    }
  },

  methods: {
    newPath(item) {
      let id = item['@id'].split('/').splice(-1); // get last element
      let newPath = this.path + '/' + id;
      return newPath;
    }
  }

};
</script>
