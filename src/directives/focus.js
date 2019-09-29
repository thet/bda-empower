import Vue from 'vue';

// See: https://stackoverflow.com/a/41912019/1337474
Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  }
});
