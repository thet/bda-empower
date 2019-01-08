<template>
  <div class="viewWrapper">
    <h1>{{ context.title }}</h1>
    <FolderNavigation />
  </div>
</template>
<script>
import FolderNavigation from '@/components/foldernavigation';

export default {
  components: {
    FolderNavigation
  },
  props: ['context']
};
</script>
