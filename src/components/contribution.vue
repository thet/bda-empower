<template>
  <intersect @enter="load">
  <article :class="[ 'uid-' + item.UID, 'state-' + item.review_state ]">

    <header>
      <h3>{{ item.title }}</h3>
      <ul v-if="context">
        <li>
          <strong>Autor*in:</strong>
          <span>{{ context.creator }}</span>
        </li>
        <li>
          <strong>Erstellt:</strong>
          <time :datetime="context.created">{{ context.created }}</time>
        </li>
        <li v-if="context.modified">
          <strong>Verändert:</strong>
          <time :datetime="context.modified">{{ context.modified }}</time>
        </li>
      </ul>
    </header>

    <div v-if="context && context.text.data" v-html="context.text.data"></div>

    <footer>
      <ul v-if="context">
        <li v-if="context.workspace">
          <strong>Workspace:</strong>
          <span>{{ context.workspace }}</span>
        </li>
        <li v-if="context.client">
          <strong>Klient*in:</strong>
          <span>{{ context.client }}</span>
        </li>
        <li v-if="context.coordinators">
          <strong>Koordinator*in:</strong>
          <span>{{ context.coordinators }}</span>
        </li>
        <li v-if="context.expert_pool">
          <strong>Expert*innen Pool:</strong>
          <span>{{ context.expert_pool }}</span>
        </li>
        <li v-if="context.experts_assigned">
          <strong>Zugewiesene Expert*innen:</strong>
          <span>{{ context.experts_assigned }}</span>
        </li>
        <li>
          <strong>URL:</strong>
          <router-link :to="{ path: makePath(item['@id']) }">{{ item.title }}</router-link>
        </li>
        <li v-if="item.previous_workspace">
          <strong>Zum vorherigen Workspace:</strong>
          <router-link :to="{ path: makePath(item.previous_workspace.path) }">{{ item.previous_workspace.title }}</router-link>
        </li>
        <li v-if="item.next_workspaces.length">
          <strong>Zum nächsten Workspace:</strong>
          <ul>
            <li
                v-for="ws in item.next_workspaces"
                :key="ws.path">
              <router-link :to="{ path: makePath(ws.path) }">{{ ws.title }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </footer>

  </article>
  </intersect>
</template>
<script>
import Intersect from 'vue-intersect'
import utils from '@/utils';

export default {

  components: {
    Intersect
  },

  props: [
    'contexttree',
    'item'
  ],

  computed: {
    context: function() {
      return this.contexttree[this.item['@id']];
    },

  },

  methods: {
    makePath(url) {
      return utils.makePath(url);
    },
    load() {
      if (!this.context) {
        this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'], set_current: false });
      }
    }
  }

};
</script>
