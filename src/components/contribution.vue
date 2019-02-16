<template>
  <intersect @enter="load">
    <v-card :class="[ 'uid-' + item.UID, 'state-' + item.review_state ]">

      <!--ContributionEdit v-if="edit" :context="context" /-->

      <v-card-title>
        <h3><TextLine v-if="context" v-model="context.title" :label="'Title'" :edit="edit" /></h3>
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
            <Autocomplete v-model="context.client" :label="'Klient*in'" :edit="edit" :multiple="false" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </li>
          <li v-if="context.coordinators">
            <strong>Koordinator*in:</strong>
            <Autocomplete v-model="context.coordinators" :label="'Koordinator*in'" :edit="edit" :multiple="false" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </li>
          <li v-if="context.expert_pool">
            <strong>Expert*innen Pool:</strong>
            <Autocomplete v-model="context.expert_pool" :label="'Expert*innen Pool'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </li>
          <li v-if="context.experts_assigned">
            <strong>Zugewiesene Expert*innen:</strong>
            <Autocomplete v-model="context.expert_pool" :label="'Zugewiesene Expert*innen'" :edit="edit" :multiple="true" :store_getter="'users/parent_allowed'" :store_loader="'users/LOAD_PARENT_ALLOWED'"/>
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
          <div v-if="editable">
            <v-btn fab dark small color="red"
                title="Cancel"
                @click="cancel"
                v-if="edit">
              <v-icon dark>cancel</v-icon>
              </v-btn>
              <v-btn fab dark small color="green"
                title="Save"
                @click="save"
                v-if="edit">
              <v-icon dark>save</v-icon>
            </v-btn>
            <v-btn fab dark small color="cyan" :class="{ editing: edit }"
                title="Edit"
                @click="toggle_edit"
                v-if="!edit">
              <v-icon dark>edit</v-icon>
            </v-btn>
          </div>
        </v-card-actions>

      </footer>

    </v-card>
  </intersect>
</template>
<script>
import Autocomplete from '@/elements/Autocomplete';
import ContributionEdit from '@/components/contribution_edit';
import TextLine from '@/elements/TextLine';
import TextArea from '@/elements/TextArea';
import Intersect from 'vue-intersect'
import utils from '@/utils';

export default {

  components: {
    Autocomplete,
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
      return this.context && this.context.can_edit;
    }
  },

  methods: {
    makePath(url) {
      return utils.makePath(url);
    },
    load() {
      if (!this.context) {
        this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'] });
      }
    },
    toggle_edit() {
      this.edit = !this.edit;
      console.log(this.edit ? 'editing' : 'not editing');
    },
    cancel() {
      this.edit = false;
      this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'], force: true });
    },
    save() {
      this.$store.dispatch('context/PATCH', { context: this.context });
      this.edit = false;
    }
  }

};
</script>
