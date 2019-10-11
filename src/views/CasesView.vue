<template>
  <div v-if="localcontext" class="viewWrapper">

    <section class="em-cases-overview">
      <ContributionSmall v-for="item in cases" :key="item.UID" :item="item" />
    </section>

    <AddButton
      v-can:add_case="context"
      :parent="context"
      :content_type="'Case'"
      :workspace="'case'"
      @save="() => load({ force: true })"
    />

  </div>
</template>

<script>
import AddButton from '@/components/buttons/add';
import ContributionSmall from '@/components/contribution_small';

export default {

  components: {
    AddButton,
    ContributionSmall
  },

  props: {
    context: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    localcontext: null
  }),

  computed: {
    cases() {
      return this.localcontext.items.filter(it => it['@type'] === 'Case');
    }
  },
  methods: {
    async load(force=false) {
      this.localcontext = this.context;
      if (force) {
        this.localcontext = await this.$store.dispatch('context/LOAD_CONTEXT', { url: this.context['@id'], force: force });
      }
    }
  },

  created() {
    this.load();
  }

};
</script>
