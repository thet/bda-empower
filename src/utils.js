import config from '@/config';

export default {
  makePath: url => {
    return String.replace(url, config.baseURI, '');
  }
};
