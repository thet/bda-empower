<template>
  <div class="view" :class="[component]">

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <component v-if="context" :is="component" :context="context" />

  </div>
</template>
<script>
import axios from 'axios';
import Default from '@/views/Default';
export default {

  components: {
    Default
  },

  data () {
    return {
      loading: false,
      error: null,
      context: null
    }
  },

  computed: {

    component () {
      let component = this.context['@type'];
      if (Object.keys(this.$options.components).indexOf(component) === -1) {
        component = 'Default';
      }
      return component;
    },

  },

  created () {
    this.fetchData()
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      this.error = this.context = null
      this.loading = true

      let url = 'http://localhost:8080/Plone';
      let path = this.$route.path || '';
      axios.get(url + path, {headers: {"Accept": "application/json"}})
        .then(results => {
          this.loading = false;
          this.context = results.data;
          console.log(this.context);
        })
        .catch(error => {
          this.error = error.toString();
        });
    }

  }

}
</script>
