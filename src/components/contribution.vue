<template>
  <intersect @enter="load">
    <v-card :class="[ 'uid-' + item.UID, 'state-' + item.review_state ]">

      <!--ContributionEdit v-if="edit" :context="context" /-->

      <v-card-title>
        <h3><TextLine v-model="item.title" :label="'Title'" :edit="edit" /></h3>
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
      </v-card-title>

      <TextArea v-if="context && context.text" v-model="context.text.data" :label="'Text'" :edit="edit"></TextArea>

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

        <v-card-actions>
          <v-btn fab dark small right bottom absolute color="cyan" :class="{ editing: edit }"
              title="Edit"
              @click="toggle_edit"
              v-if="editable">
            <v-icon dark>edit</v-icon>
          </v-btn>
        </v-card-actions>

      </footer>

    </v-card>
  </intersect>
</template>
<script>
import ContributionEdit from '@/components/contribution_edit';
import TextLine from '@/elements/TextLine';
import TextArea from '@/elements/TextArea';
import Intersect from 'vue-intersect'
import utils from '@/utils';

export default {

  components: {
    ContributionEdit,
    Intersect,
    TextLine,
    TextArea
  },

  props: [
    'contexttree',
    'item'
  ],

  data: function() {
    return {
      edit: false
    };
  },

  computed: {
    context: function() {
      return this.contexttree[this.item['@id']];
    },
    editable: function() {
      // TODO: check for user rights.
      return !!this.context;
    }
  },

  methods: {
    makePath(url) {
      return utils.makePath(url);
    },
    load() {
      if (!this.context) {
        this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'], set_current: false });
      }
    },
    toggle_edit() {
      this.edit = !this.edit;
      console.log(this.edit ? 'editing' : 'not editing');
    }
  }

};
</script>
