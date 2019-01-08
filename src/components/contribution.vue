<template>
  <article :class="[ 'uid-' + item.uid, 'state-' + item.review_state ]">

    <header>
      <h3>{{ item.title }}</h3>
      <ul>
        <li>
          <strong>Autor*in:</strong>
          <span>{{ item.creator }}</span>
        </li>
        <li>
          <strong>Erstellt:</strong>
          <time :datetime="item.created">{{ item.created }}</time>
        </li>
        <li v-if="item.modified">
          <strong>Verändert:</strong>
          <time :datetime="item.modified">{{ item.modified }}</time>
        </li>
      </ul>
    </header>

    <div v-html="item.text"></div>

    <footer>
      <ul>
        <li v-if="item.workspace">
          <strong>Workspace:</strong>
          <span>{{ item.workspace }}</span>
        </li>
        <li v-if="item.client">
          <strong>Klient*in:</strong>
          <span>{{ item.client }}</span>
        </li>
        <li v-if="item.coordinators">
          <strong>Koordinator*in:</strong>
          <span>{{ item.coordinators }}</span>
        </li>
        <li v-if="item.expert_pool">
          <strong>Expert*innen Pool:</strong>
          <span>{{ item.expert_pool }}</span>
        </li>
        <li v-if="item.experts_assigned">
          <strong>Zugewiesene Expert*innen:</strong>
          <span>{{ item.experts_assigned }}</span>
        </li>
        <li>
          <strong>URL:</strong>
          <router-link :to="{ path: makePath(item['@id']) }">{{ item.title }}</router-link>
        </li>
      </ul>
    </footer>

  </article>
</template>
<script>
import utils from '@/utils';

export default {

  props: [
    'item'
  ],

  methods: {
    makePath(uri) {
      return utils.makePath(uri);
    }
  }

};
</script>
