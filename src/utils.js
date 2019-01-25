import config from '@/config';

export default {
  makePath: url => {
    return url.replace(config.baseURI, '').replace(config.basePath, '');
  },
  makeURL: path => {
    return config.baseURI + path.replace(config.basePath, '');
  }
};
