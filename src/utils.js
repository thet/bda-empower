import config from '@/config';

export default {
  makePath: url => {
    return url.replace(config.baseURI, '').replace(config.basePath, '');
  }
};
