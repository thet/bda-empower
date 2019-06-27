import config from '@/config';

export default {
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
  zeropad: (val, len = 2) => {
    let ret = val.toString();
    while (ret.length < len) { ret = `0${ret}`; }
    return ret;
  },
  getattr(object, attribute, default=null) {
    try {
      return object[attribute];
    } catch {
      return default;
    }
  }
};
