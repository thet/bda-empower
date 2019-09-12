<template>
  <article class="em-contribution em-contribution--mode_normal"
    :class="[
      'em-contribution-' + (context && context.workspace) || '',
      'uid-' + context.UID || '',
      'state-' + context.review_state || 'private',
      'item.is_workspace_root' ? 'em-workspace-root' : null,
      context ? null : 'em-contribution-init'
  ]">

    <header class="em-contribution-header">

      <div v-if="available_field('creators')">
        <AccountIcon
          v-for="(account, cnt) in context.creators || []"
          :key="cnt"
          :account="account"
          :role="'Autor*in'" />
      </div>

      <h3 class="em-contribution-title"><TextLine v-if="available_field('title')" v-model="context.title" /></h3>

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
      <TextArea
        v-if="available_field('description')"
        v-model="context.description"
      />
      <TextEditor
        v-if="available_field('text')"
        v-model="context.text"
      />
    </div>

    <footer class="em-contribution-footer">

      <div class="em-contribution-meta">
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
        <div>
          <strong>URL:</strong>
          <router-link :to="{ path: makePath(context['@id']) }">{{ context.title }}</router-link>
        </div>
        <div v-if="false">
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
      </div>

      <div class="em-actions" v-if="editable">
        <EditButton :context="context" />
        <AddButton :parent="context" :content_type="'Contribution'" />

        <AddButton v-for="ws of next_ws" :key='`add-${ws}`' :parent="context" :content_type="'Contribution'" :workspace="ws" />
      </div>

    </footer>

  </article>
</template>
<script>
import AccountIcon from '@/components/account_icon';
import AddButton from '@/components/buttons/add';
import EditButton from '@/components/buttons/edit';
import TextArea from '@/elements/TextArea';
import TextEditor from '@/elements/TextEditor';
import TextLine from '@/elements/TextLine';
import utils from '@/utils';


export default {

  components: {
    AccountIcon,
    AddButton,
    EditButton,
    TextLine,
    TextArea,
    TextEditor
  },
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  computed: {
    editable() {
      return this.context.can_edit;
    },
    next_ws() {
      let ws = this.$store.state.workspace.specification;
      return ws[this.context.workspace].next;
    }
  },
  methods: {
    available_field(name) {
      return this.context.hasOwnProperty(name);
    },
    makePath(url) {
      return utils.makePath(url);
    }
  }
};
</script>
