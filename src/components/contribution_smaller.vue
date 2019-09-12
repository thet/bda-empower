<template>
    <article class="em-contribution em-contribution--mode_smaller relative"
      :class="[
        `em-contribution-${item.workspace}`,
        `uid-${item.UID}`,
        `state-${item.review_state || 'private'}`,
        item.workspace_root ? 'em-workspace-root' : null
    ]">
      <header class="em-contribution-header">
        <p class="em-contribution-title">
          <router-link :to="{ path: makePath(item['@id']) }">
            {{ item.title }}
          </router-link>
        </p>
      </header>
    </article>
</template>
<script>
import utils from '@/utils';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    makePath(url) {
      return utils.makePath(url);
    }
  }
};
</script>
