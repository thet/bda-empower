<template>
  <intersect @enter="load">
    <ModalWrapper :active="edit">
    <form @submit.prevent.stop="save">
    <article class="em-contribution em-contribution--mode_normal"
      :class="[
        'em-contribution-' + (context && context.workspace) || '',
        'uid-' + item.UID || '',
        'state-' + item.review_state || 'private',
        item.is_workspace_root ? 'em-workspace-root' : null,
        context ? null : 'em-contribution-init'
    ]">

      <ContributionEdit v-if="edit" :context="context" />

      <header class="em-contribution-header">

        <div v-if="available_field('creators')">
          <AccountIcon
            v-for="(account, cnt) in context.creators || []"
            :key="cnt"
            :account="account"
            :role="'Autor*in'" />
        </div>

        <h3 class="em-contribution-title"><TextLine v-if="available_field('title')" v-model="context.title" :label="'Title'" :edit="edit" /></h3>

        <div v-if="available_field('client')">
          Kient*in
          <AccountIcon
            v-for="(account, cnt) in context.client || []"
            :key="cnt"
            :account="account"
            :role="'Klient*in'" />
        </div>

        <div class="em-date" v-if="available_field('created')">
          <strong>Erstellt:</strong>
          <time :datetime="context.created">{{ context.created | format_date }}</time>
        </div>
        <div class="em-date" v-if="available_field('modified')">
          <strong>Verändert:</strong>
          <time :datetime="context.modified">{{ context.modified | format_date }}</time>
        </div>

      </header>

      <div class="em-contribution-body">
        <TextArea v-if="available_field('description')" v-model="context.description" :label="'Description'" :edit="edit"></TextArea>
        <TextEditor v-if="available_field('text')" v-model="context.text" :label="'Text'" :edit="edit"></TextEditor>
      </div>

      <footer class="em-contribution-footer">

        <div class="em-contribution-meta" v-if="!edit">
          <div v-if="available_field('coordinators')">
            Koordinator*in
            <AccountIcon
              v-for="(account, cnt) in context.coordinators || []"
              :key="cnt"
              :account="account"
              :role="'Koordinator*in'" />
          </div>

          <div v-if="available_field('expert_pool')">
            Expert*innen Pool:
            <AccountIcon
              v-for="(account, cnt) in context.expert_pool || []"
              :key="cnt"
              :account="account"
              :role="'Expert*in'" />
          </div>

          <div v-if="available_field('experts_assigned')">
            Leseberechtigung
            <AccountIcon
              v-for="(account, cnt) in context.experts_assigned || []"
              :key="cnt"
              :account="account"
              :role="'Account'" />
          </div>
        </div>

        <div class="em-editarea" v-if="context">
          <div v-if="context.workspace">
            <strong>Workspace:</strong>
            <span>{{ context.workspace }}</span>
          </div>
          <div v-if="available_field('client')">
            <strong>Klient*in:</strong>
            <Autocomplete v-model="context.client" :label="'Klient*in'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </div>
          <div v-if="available_field('coordinators')">
            <strong>Koordinator*in:</strong>
            <Autocomplete v-model="context.coordinators" :label="'Koordinator*in'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </div>
          <div v-if="available_field('expert_pool')">
            <strong>Expert*innen Pool:</strong>
            <Autocomplete v-model="context.expert_pool" :label="'Expert*innen Pool'" :edit="edit" :multiple="true" :store_getter="'users/users'" :store_loader="'users/LOAD_USERS'"/>
          </div>
          <div v-if="available_field('experts_assigned')">
            <strong>Zugewiesene Expert*innen:</strong>
            <Autocomplete v-model="context.experts_assigned" :label="'Zugewiesene Expert*innen'" :edit="edit" :multiple="true" :store_getter="'users/allowed_users'" :store_loader="'users/LOAD_ALLOWED_USERS'" :options_loader="{ url: parent_url }"/>
          </div>
          <div v-if="item['@id']">
            <strong>URL:</strong>
            <router-link :to="{ path: makePath(item['@id']) }">{{ item.title }}</router-link>
          </div>
          <div v-if="item.previous_workspace">
            <strong>Zum vorherigen Workspace:</strong>
            <router-link :to="{ path: makePath(item.previous_workspace['@id']) }">{{ item.previous_workspace.title }}</router-link>
          </div>
          <div v-if="item.next_workspaces && item.next_workspaces.length">
            <strong>Zum nächsten Workspace:</strong>
            <ul>
              <li
                  v-for="ws in item.next_workspaces"
                  :key="ws.path">
                <router-link :to="{ path: makePath(ws['@id']) }">{{ ws.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="em-actions" v-if="editable">
          <v-btn fab dark small color="red"
              title="Cancel"
              @click="cancel"
               v-if="edit">
              <v-icon dark>{{ icon_cancel }}</v-icon>
            </v-btn>
            <v-btn fab dark small color="green"
              title="Save"
              type="submit"
              v-if="edit">
            <v-icon dark>{{ icon_save }}</v-icon>
          </v-btn>
          <v-btn fab dark small color="cyan" :class="{ editing: edit }"
              title="Edit"
              @click="toggle_edit"
              v-if="!edit">
            <v-icon dark>{{ icon_edit }}</v-icon>
          </v-btn>
          <v-btn fab dark small color="green" :class="{ editing: edit }"
              title="Add"
              @click="do_add"
              v-if="!edit">
            <v-icon dark>{{ icon_add }}</v-icon>
          </v-btn>
        </div>
      </footer>

    </article>
    </form>
    </ModalWrapper>
  </intersect>
</template>
<script>
import {
  mdiCancel,
  mdiContentSave,
  mdiPencil,
  mdiPlus,
} from '@mdi/js';
import AccountIcon from '@/components/account_icon';
import Autocomplete from '@/elements/Autocomplete';
import config from '@/config';
import ContributionEdit from '@/components/contribution_edit';
import Intersect from 'vue-intersect'
import ModalWrapper from '@/components/modal_wrapper';
import TextArea from '@/elements/TextArea';
import TextEditor from '@/elements/TextEditor';
import TextLine from '@/elements/TextLine';
import utils from '@/utils';


export default {

  components: {
    AccountIcon,
    Autocomplete,
    ContributionEdit,
    Intersect,
    TextLine,
    TextArea,
    TextEditor,
    ModalWrapper,
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      edit: !this.item['@id'], // when no id we're adding content and want to present the edit mode immediately.
      icon_add: mdiPlus,
      icon_edit: mdiPencil,
      icon_save: mdiContentSave,
      icon_cancel: mdiCancel
    };
  },

  computed: {

    context() {
      let context;
      if (this.item['@id']) {
        context = this.$store.state.context.items[utils.makePath(this.item['@id'])];
      } else {
        // Adding
        context = new config[`${this.item['@type']}Model`]({
          '@type': this.item['@type'],
          workspace: this.item.workspace || this.item.parent.workspace,
          parent: this.item.parent
        })
      }
      return context;
    },

    parent_url() {
      if (this.item.parent) {
        return this.item.parent['@id'];
      }
      return utils.parentURL(this.item['@id']);
    },

    editable() {
      return this.context && this.context.can_edit || ! this.item['@id'];
    }

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
      } else {
        this.$emit('addcancelcontribution');
      }
    },

    save() {
      if (this.item['@id']) {
        this.$store.dispatch('context/PATCH', { context: this.context });
      } else {
        this.$store.dispatch('context/POST', {
          parent_url: this.item.parent['@id'],
          context: this.context
        }).then(() => {
          this.$emit('addsavecontribution');
        });
      }
      this.edit = false;
    }

  }

};
</script>
