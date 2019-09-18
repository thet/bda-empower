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

    <div v-if="files.length" class="filedrop-previews">
      <strong>Files to upload</strong>
      <div class="filedrop-preview" v-for="(preview, cnt) of files" :key="`preview_${cnt}`">
        <img v-if="is_image(preview.file)" class="filedrop-preview-image" :src="preview.src" title="preview.name" />
        <div v-if="!is_image(preview.file)" class="filedrop-preview-file">{{ preview.file.name }}</div>
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

    <div v-if="existing_files.length" class="filedrop-previews">
      <strong>Existing files</strong>
      <div class="filedrop-preview" v-for="(preview, cnt) of existing_files" :key="`preview_existing_${cnt}`">
        <a v-if="is_image(preview.file)" :href="preview.src" target="_blank"><img class="filedrop-preview-image" :src="preview.src" /></a>
        <a v-if="!is_image(preview.file)" :href="preview.src" target="_blank" class="filedrop-preview-file">{{ preview.file.name }}</a>
        <v-btn
          class="filedrop-preview-delete"
          fab dark small color="red"
          title="Delete"
          @click="overlay = true"
          >
          <v-icon dark>{{ icon_close }}</v-icon>
        </v-btn>
        <v-overlay
          :absolute="true"
          :opacity="1"
          :value="overlay"
        >
          <strong>Really delete file from server?</strong>
          <v-btn
            color="orange lighten-2"
            @click="delete_file(preview)"
          >
            <v-icon dark>{{ icon_close }}</v-icon>
          </v-btn>
        </v-overlay>
      </div>
    </div>

  </div>
</template>

<script>
import {
  mdiClose,
} from '@mdi/js';
import utils from '@/utils';

export default {

  props: {
    // from here on, only required if edit is true.
    context: {
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
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    store_save: {
      type: String,
      required: false
    },
    store_load: {
      type: String,
      required: false
    },
    store_delete: {
      type: String,
      required: false
    }
  },

  data: function() {
    return {
      icon_close: mdiClose,
      active: false,
      files: [],
      existing_files: [],
      overlay: false
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

    is_image(file) {
      return utils.image_or_file(file) === 'image';
    },

    add_files(files) {
      files = [...files];
      for (let file of files) {
        const file_ = {
          file: file,
          src: null
        };
        this.files.push(file_);
        if (this.is_image(file)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            file_.src = reader.result;
          };
        }
      }
    },

    async delete_file(file) {
      this.overlay = false;
      if (file.file instanceof File) {
        // delete added and not uploaded file
        const idx = this.files.indexOf(file);
        if (idx > -1) {
          this.files.splice(idx, 1);
        }
      } else {
        // delete file from server
        await this.$store.dispatch(this.store_delete, { url: file.src } );
        const idx = this.existing_files.indexOf(file);
        if (idx > -1) {
          this.existing_files.splice(idx, 1);
        }
      }
    },

    async save_files(url = null) {
      url = url ? url : this.context['@id'];
      return await this.$store.dispatch(this.store_save, { url: url, files: this.files });
    },

    async get_files() {
      // get already uploaded files for display
      if (! this.store_load || ! this.context['@id']) { return; }
      const response = await this.$store.dispatch(this.store_load, { url: this.context['@id'] });

      this.existing_files = response.map(it => ({
        file: {
          name: it.title,
          type: it['@type'].toLowerCase() // hack to fullfill contract when checking for type,
        },
        src: it['@id']
      }));
    }

  },

  mounted() {
    this.get_files();
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
