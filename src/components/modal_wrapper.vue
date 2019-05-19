<script>
export default {
  name: 'modalwrapper',

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  render (createElement) {
    let ret = this.$slots.default;
    if (this.active) {
      ret = createElement(
        'div',
        { class: 'modal' },
        ret
      );
    }
    return ret;
  }

};
</script>
