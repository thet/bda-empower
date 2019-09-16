<template>
  <div
    class="filedrop"
    :class='{ active: active }'
    @dragenter.stop.prevent="handle_drag"
    @dragover.stop.prevent="handle_drag"
    @dragleave.stop.prevent="handle_leave"
    @drop.stop.prevent="handle_drop">
    <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
    <input type="file" multiple @change="handle_input">
    <label>Select some files</label>

    <div class="filedrop-previews">
      <div class="filedrop-preview" v-for="(preview, cnt) of files" :key="`preview_${cnt}`">
        <img class="filedrop-preview-image" v-if="preview.src" :src="preview.src" />
        <div class="filedrop-preview-file" v-if="!preview.src">{{ preview.file.name }}</div>
        <v-btn
          class="filedrop-preview-delete"
          fab dark small color="red"
          title="Delete"
          @click="delete_file(preview)"
          >
          <v-icon dark>{{ icon_close }}</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdiClose,
} from '@mdi/js';

export default {

  props: {
    value: {
      type: Array,
      required: false
    },
    // from here on, only required if edit is true.
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: function() {
    return {
      icon_close: mdiClose,
      active: false,
      files: []
    };
  },

  methods: {
    handle_drag() {
      this.active = true;
    },

    handle_leave() {
      this.active = false;
    },

    handle_drop(event) {
      this.active = false;
      const dt = event.dataTransfer;
      const files = dt.files;
      this.add_files(files);
    },

    handle_input(event) {
      this.add_files(event.target.files);
    },

    add_files(files) {
      files = [...files];
      for (let file of files) {
        const file_ = {
          file: file,
          src: null
        };
        this.files.push(file_);
        if (file.type.indexOf('image') !== -1) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            file_.src = reader.result;
          };
        }
      }
      this.$emit('input', this.files);
    },

    delete_file(file) {
      const idx = this.files.indexOf(file);
      if (idx > -1) {
        this.files.splice(idx, 1);
      }
      this.$emit('input', this.files);
    }
  }

};
</script>

<style>
.filedrop {
  border: 2px dashed #ccc;
  border-radius: 2rem;
  margin: 2rem auto;
  padding: 2rem;
}
.filedrop.active {
  color: white;
  background: rgba(0, 0, 0, 0.5);
}
.filedrop-previews {
  display: flex;
}
.filedrop-preview {
  width: 200px;
  height: 200px;
  margin: 0 1em 1em 0;
  display: flex;
  justify-content: center;
  align-items: top;
  position: relative;

}
.filedrop-preview-image,
.filedrop-preview-file {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
}
.filedrop-preview-delete {
  position: absolute;
  right: 4em;
  top: 1em;
  display: none;
  opacity: 0;
}
.filedrop-preview:hover .filedrop-preview-delete {
  display: block;
  opacity: 1;
}
</style>
