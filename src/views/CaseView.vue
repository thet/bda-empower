<template>
  <div class="viewWrapper">
    <WorkspaceTabs />
    <Workspace :context="context" :workspace="'case'" />
  </div>
</template>
<script>
import Workspace from '@/components/workspace';
import WorkspaceTabs from '@/components/workspace_tabs';

export default {
  components: {
    Workspace,
    WorkspaceTabs
  },
  props: [
    'context'
  ]
};
</script>
