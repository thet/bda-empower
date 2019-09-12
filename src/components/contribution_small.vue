<template>
    <article class="em-contribution em-contribution--mode_small relative"
      :class="[
        `em-contribution-${item.workspace}`,
        `uid-${item.UID}`,
        `state-${item.review_state || 'private'}`,
        item.workspace_root ? 'em-workspace-root' : null
    ]">
      <header class="em-contribution-header">
        <h3 class="em-contribution-title">
          <router-link :to="{ path: makePath(item['@id']) }">
            {{ item.title }}
          </router-link>
        </h3>
        <div class="em-date" v-if="item.created">
          <strong>Erstellt:</strong>
          <time :datetime="item.created">{{ item.created | format_date }}</time>
        </div>
        <div class="em-date" v-if="item.modified">
          <strong>Verändert:</strong>
          <time :datetime="item.modified">{{ item.modified | format_date }}</time>
        </div>
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
