<template>
  <intersect @enter="load">
    <article class="em-contribution" :class="[ 'em-contribution-' + (context && context.workspace) || '', 'uid-' + item.UID || '', 'state-' + item.review_state || 'private']">

      <!--ContributionEdit v-if="edit" :context="context" /-->

      <header class="em-contribution-header">
        <h3><TextLine v-if="available_field('title')" v-model="context.title" :label="'Title'" :edit="edit" /></h3>
        <ul v-if="context">
          <li>
            <strong>Autor*in:</strong>
            <span>{{ context.creators }}</span>
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

      <div class="em-contribution-body">
        <TextArea v-if="available_field('description')" v-model="context.description" :label="'Description'" :edit="edit"></TextArea>
        <TextEditor v-if="available_field('text')" v-model="context.text.data" :label="'Text'" :edit="edit"></TextEditor>
      </div>

      <footer class="em-contribution-footer">
        <ul v-if="context">
          <li v-if="context.workspace">
            <strong>Workspace:</strong>
            <span>{{ context.workspace }}</span>
          </li>
          <li v-if="available_field('client')">
            <strong>Klient*in:</strong>
            <Autocomplete v-model="context.client" :label="'Klient*in'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </li>
          <li v-if="available_field('coordinators')">
            <strong>Koordinator*in:</strong>
            <Autocomplete v-model="context.coordinators" :label="'Koordinator*in'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </li>
          <li v-if="available_field('expert_pool')">
            <strong>Expert*innen Pool:</strong>
            <Autocomplete v-model="context.expert_pool" :label="'Expert*innen Pool'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </li>
          <li v-if="available_field('experts_assigned')">
            <strong>Zugewiesene Expert*innen:</strong>
            <Autocomplete v-model="context.experts_assigned" :label="'Zugewiesene Expert*innen'" :edit="edit" :multiple="true" :store_getter="'users/parent_allowed'" :store_loader="'users/LOAD_PARENT_ALLOWED'" :options_loader="{ url: context['@id'] }"/>
          </li>
          <li v-if="item['@id']">
            <strong>URL:</strong>
            <router-link :to="{ path: makePath(item['@id']) }">{{ item.title }}</router-link>
          </li>
          <li v-if="item.previous_workspace">
            <strong>Zum vorherigen Workspace:</strong>
            <router-link :to="{ path: makePath(item.previous_workspace.path) }">{{ item.previous_workspace.title }}</router-link>
          </li>
          <li v-if="item.next_workspaces && item.next_workspaces.length">
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
            <v-btn fab dark small color="green" :class="{ editing: edit }"
                title="Add"
                @click="do_add"
                v-if="!edit">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </footer>

    </article>
  </intersect>
</template>
<script>
import { mapGetters } from 'vuex';
import Autocomplete from '@/elements/Autocomplete';
import ContributionEdit from '@/components/contribution_edit';
import TextLine from '@/elements/TextLine';
import TextArea from '@/elements/TextArea';
import TextEditor from '@/elements/TextEditor';
import Intersect from 'vue-intersect'
import utils from '@/utils';
import config from '@/config';


export default {

  components: {
    Autocomplete,
    ContributionEdit,
    Intersect,
    TextLine,
    TextArea,
    TextEditor
  },

  props: [
    'item'
  ],

  data: function() {
    return {
      edit: !this.item['@id'] // when no id we're adding content and want to present the edit mode immediately.
    };
  },

  computed: {
    context: function() {
      if (this.item['@id']) {
        return this.contexttree[this.item['@id']];
      } else {
        // no id? we're adding content.
        let addModel;
        if (this.item['@type'] === 'Case') {
          addModel = new config.CaseModel();
        } else {
          addModel = new config.ContributionModel({
            workspace: this.item.parent.workspace
          });

        }
        addModel['@type'] = this.item['@type'];
        return addModel;
      }
    },
    editable: function() {
      return this.context && this.context.can_edit || ! this.item['@id'];
    },
    ...mapGetters({
      contexttree: 'context/contexttree'
    })
  },

  methods: {

    available_field(name) {
      return this.context && this.context.hasOwnProperty(name);
    },

    makePath(url) {
      return utils.makePath(url);
    },

    load() {
      if (this.item['@id'] && !this.context) {
        this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'] });
      }
    },

    toggle_edit() {
      this.edit = !this.edit;
    },

    do_add() {
      this.$emit('addcontribution');
    },

    cancel() {
      this.edit = false;
      if (this.item['@id']) {
        this.$store.dispatch('context/LOAD_CONTEXT', { url: this.item['@id'], force: true });
      }
    },

    save() {
      if (this.item['@id']) {
        this.$store.dispatch('context/PATCH', { context: this.context });
      } else {
        this.$store.dispatch('context/POST', { url: this.item.parent['@id'], context: this.context });
      }
      this.edit = false;
    }

  }

};
</script>
