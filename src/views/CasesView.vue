<template>
  <div class="viewWrapper">
    <section class="em-cases-overview" v-if="items">
      <ContributionSmall v-for="item in items" :key="item['@id']" :item="item" />
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import ContributionSmall from '@/components/contribution_small';
import utils from '@/utils';

export default {

  components: {
    ContributionSmall
  },

  props: [
    'context'
  ],

  data: function() {
    return {
      items: []
    };
  },

  methods: {
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
