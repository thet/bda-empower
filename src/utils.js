import config from '@/config';

export default {
  makePath: url => {
    return url.replace(config.baseURI, '').replace(config.basePath, '');
  },
  makeURL: path => {
    return config.baseURI + path.replace(config.basePath, '');
  },
  zeropad: (val, len = 2) => {
    let ret = val.toString();
    while (ret.length < len) { ret = `0${ret}`; }
    return ret;
  }
};
