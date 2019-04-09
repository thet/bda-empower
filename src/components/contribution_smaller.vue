<template>
    <article class="em-contribution em-contribution--mode_small"
      :class="[
        `em-contribution-${item.workspace}`,
        `uid-${item.UID}`,
        `state-${item.review_state || 'private'}`,
        item.is_workspace_root ? 'em-workspace-root' : null
    ]">
      <header class="em-contribution-header">
        <h3 class="em-contribution-title">{{ item.title }}</h3>
      </header>
    </article>

</template>
<script>
import utils from '@/utils';
import config from '@/config';


export default {
  props: {
    item: Object
  }
};
</script>
