import config from '@/config';
import Vue from 'vue';

// See: https://github.com/mblarsen/vue-browser-acl/blob/6158c953974a5631a5eb16089c9ba17b4b95c075/index.js#L216
//      https://stackoverflow.com/questions/43003976/a-custom-directive-similar-to-v-if-in-vuejs#43543814
function commentNode(el, vnode) {
  const comment = document.createComment(' ');

  Object.defineProperty(comment, 'setAttribute', {
    value: () => undefined
  })

  vnode.text = ' ';
  vnode.elm = comment;
  vnode.isComment = true;
  vnode.tag = undefined;
  vnode.data.directives = undefined;

  if (vnode.componentInstance) {
    vnode.componentInstance.$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
}


// See: https://codeburst.io/reusable-vue-directives-v-can-753bf54e563f
function can(el, binding, vnode) {
  if (!Object.keys(binding.arg).length) {
    throw 'v-can needs an argument and context like ``v-can:edit="object"``';
  }
  const pm = config.PERMISSION_MAP[binding.arg];
  const can = binding.value?.permissions?.[pm] || false;
  if (!can) {
    commentNode(el, vnode);
  }
}


// Register directive
Vue.directive('can', can);
