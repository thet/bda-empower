import axios from 'axios';
import store from '@/store';

export default function setup() {
  // AXIOS Config
  axios.defaults.headers.common['Accept'] = 'application/json';

  // Add a request interceptor
  // See: https://stackoverflow.com/a/47946984/1337474
  axios.interceptors.request.use(
    function(config) {
      const auth_token = store.state.login.auth_token;
      if(auth_token) {
        config.headers.Authorization = `Bearer ${auth_token}`;
      }
      return config;
    }, function(err) {
      return Promise.reject(err);
    }
  );
}
