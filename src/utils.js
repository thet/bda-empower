import config from '@/config';
import Vue from "vue";

export default {
  timeout: ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  cleanURL: url => {
    return url.split('?')[0].split('+')[0].split('#')[0].split('&')[0];
  },
  makePath: url => {
    let path = url.replace(config.baseURL, '');
    if (path[0] !== '/') {
      path = `/${path}`;
    }
    //if (path.endsWith('/')) {
    //  path = path.slice(0, -1);
    //}
    return path;
  },
  parentURL: url => {
    let parts = url.split('/');
    parts.pop();
    return parts.join('/');
  },
  zeropad: (val, len = 2) => {
    let ret = val.toString();
    while (ret.length < len) { ret = `0${ret}`; }
    return ret;
  },
  getattr(object, attribute, default_=null) {
    try {
      return object[attribute];
    } catch {
      return default_;
    }
  },
  items_from_vocab(vocab) {
      return vocab.items.map(it => { return { 'text': it.title, 'value': it.token }; });
  },
  image_or_file(file) {
    return file.type.toLowerCase().indexOf('image') > -1 ? 'image' : 'file';
  },
  capitalize(string) {
    // https://stackoverflow.com/a/1026087/1337474
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  is_inline_type(item) {
    return config.inline_types.includes(item['@type']);
  },
  logger: {
    log(msg) {
      if (!Vue.config.silent) {
        console.log(msg);
      }
    },
    debug(msg) {
      if (!Vue.config.silent) {
        console.debug(msg);
      }
    },
    warn(msg) {
      if (!Vue.config.silent) {
        console.warn(msg);
      }
    },
    error(msg) {
      if (!Vue.config.silent) {
        console.error(msg);
      }
    }
  }
};
