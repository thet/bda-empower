<template>
  <div class="viewWrapper">

  <button class="em-btn em-btn-case" @click="addContribution">Add Case</button>
    <div v-if="add" class="article_wrapper">
      <Contribution
          :item="{ '@type': 'Case', parent: context }"
          @addsavecontribution="addSaveContribution"
          @addcancelcontribution="addCancelContribution"
          />
    </div>

    <section class="em-cases-overview" v-if="items">
      <ContributionSmall v-for="item in items" :key="item['@id']" :item="item" />
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import Contribution from '@/components/contribution';
import ContributionSmall from '@/components/contribution_small';
import utils from '@/utils';

export default {

  components: {
    Contribution,
    ContributionSmall
  },

  props: [
    'context'
  ],

  data: function() {
    return {
      add: false,
      items: []
    };
  },

  methods: {
    addContribution() {
      this.add = true;
    },
    addSaveContribution() {
      this.add = false;
      this.$vnode.key = new Date();
    },
    addCancelContribution() {
      this.add = false;
    },
    load() {
      let url = this.context['@components']['cases_overview']['@id'];
      axios
        .get(url)
        .then(response => {
          console.log(`load cases: ${url}`);
          this.items = response.data.items;
        })
        .catch(error => {
          console.log(`Error while loading cases at: ${url}`);
          console.log(error);
        });
    }
  },

  created() {
    this.load();
  }

};
</script>
