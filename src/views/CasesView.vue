<template>
  <div v-if="_context" class="viewWrapper">

    <section class="em-cases-overview">
      <ContributionSmall v-for="item in _context.items" :key="item['@id']" :item="item" />
    </section>

    <AddButton
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
    _context: null
  }),

  methods: {
    async load(force=false) {
      this._context = this.context;
      if (force) {
        this._context = await this.$store.dispatch('context/LOAD_CONTEXT', { url: this.context['@id'], force: force });
      }
    }
  },

  created() {
    this.load();
  },

  watch: {
    context: 'load' // reload thread when item changes
  }

};
</script>
