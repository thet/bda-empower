import config from '@/config';
import Vue from "vue";

export default {
  timeout: ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  makePath: url => {
    let path = url.replace(config.baseURI, '').replace(config.basePath, '');
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  },
  makeURL: path => {
    return config.baseURI + path.replace(config.basePath, '');
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
