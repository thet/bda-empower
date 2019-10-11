<template>
  <article class="em-contribution em-contribution--mode_normal"
    :class="[
      `em-contribution-${context.workspace}`,
      `uid-${context.UID}`,
      `state-${context.review_state}`,
      context.workspace_root ? 'em-workspace-root' : null
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

    <div v-if="files" class="em-contribution-sidebar">
      <ul>
        <li v-for="file of files" :key="`file-${file.UID}`">
          <router-link :to="{ path: makePath(file['@id']) }">{{ file.title }}</router-link>
        </li>
      </ul>
    </div>

    <footer class="em-contribution-footer">

      <div class="em-contribution-meta">
        <div class="em-contribution-meta-users">
          <div class="em-contribution-meta-users-coordinators" v-if="available_field('coordinators')">
            Koordinator*in
            <AccountIcon
              v-for="(account, cnt) in context.coordinators || []"
              :key="cnt"
              :account="account"
              :role="'Koordinator*in'" />
          </div>

          <div class="em-contribution-meta-users-expert_pool" v-if="available_field('expert_pool')">
            Expert*innen Pool:
            <AccountIcon
              v-for="(account, cnt) in context.expert_pool || []"
              :key="cnt"
              :account="account"
              :role="'Expert*in'" />
          </div>

          <div class="em-contribution-meta-users-experts_assigned" v-if="available_field('experts_assigned')">
            Leseberechtigung
            <AccountIcon
              v-for="(account, cnt) in context.experts_assigned || []"
              :key="cnt"
              :account="account"
              :role="'Account'" />
          </div>
        </div>

        <div class="em-contribution-meta-info" v-if="context">
          <div class="em-contribution-meta-info-workspace" v-if="context.workspace">
            <strong>Workspace:</strong>
            <span>{{ context.workspace }}</span>
          </div>

          <div class="em-contribution-meta-info-url">
            <strong>URL:</strong>
            <router-link :to="{ path: makePath(context['@id']) }">{{ context.title }}</router-link>
          </div>

          <div class="em-contribution-meta-info-previous_workspace" v-if="false">
          <div v-if="item.previous_workspace">
            <strong>Zum vorherigen Workspace:</strong>
            <router-link :to="{ path: makePath(item.previous_workspace['@id']) }">{{ item.previous_workspace.title }}</router-link>
          </div>
          <div class="em-contribution-meta-info-next_workspace" v-if="item.next_workspaces && item.next_workspaces.length">
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
      </div>

      <div class="em-actions" v-if="editable">
        <div class="em-actions-context">
          <EditButton
            class="em-button-edit"
            v-can:modify="context"
            :context="context"
          />
          <DeleteButton
            class="em-button-delete"
            v-can:delete="context"
            :context="context"
          />
        </div>
        <div class="em-actions-contents">
          <AddButton
            class="em-button-add-answer"
            v-can:add_contribution="context"
            :parent="context"
            :content_type="'Contribution'"
          >{{ $t('contribution.add_answer') }}</AddButton>
          <AddButton
            class="em-button-add-workspace"
            v-can:add_contribution="context"
            v-for="ws of next_ws"
            :key='`add-${ws}`'
            :parent="context"
            :content_type="'Contribution'"
            :workspace="ws"
          >{{ $t('contribution.add_workspace', { ws: $t(`workspace.${ws}`) }) }}</AddButton>
        </div>
      </div>

    </footer>

  </article>
</template>

<script>
import AccountIcon from '@/components/account_icon';
import AddButton from '@/components/buttons/add';
import EditButton from '@/components/buttons/edit';
import DeleteButton from '@/components/buttons/delete';
import TextArea from '@/elements/TextArea';
import TextEditor from '@/elements/TextEditor';
import TextLine from '@/elements/TextLine';
import utils from '@/utils';


export default {

  components: {
    AccountIcon,
    AddButton,
    EditButton,
    DeleteButton,
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
    },
    files() {
      return this.context.items.filter(it => utils.is_inline_type(it));
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
