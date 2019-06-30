<template>
  <div>
    <TextEditor
      v-if="edit"
      :text="_value"
      :options="editor_options"
      v-on:edit="editor_edit"
      custom-tag="div"
    ></TextEditor>
    <div v-if="!edit && _value" v-html="_value"></div>
  </div>
</template>
<script>
import TextEditor from 'vue2-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

export default {

  components: {
    TextEditor
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    }
  },

  data: function() {
    return {
      editor_options: {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor']
        },
        anchor: {
          customClassOption: 'alink',
          customClassOptionText: 'Button',
          linkValidation: false,
          targetCheckbox: false,
          targetCheckboxText: 'Open in new window'
        }
      }
    }
  },

  computed: {
    _value: {
      get: function() {
        return this.value ? this.value.data : '';
      },
      set: function(val) {
        // plone.app.textfield value
        const _val = {
          'content-type': 'text/html',
          data: val,
          encoding: 'utf8'
        }
        this.$emit('input', _val);
      }
    }
  },

  methods: {
    editor_edit: function(operation) {
      this._value = operation.api.origElements.innerHTML;
    }
  }

};
</script>
