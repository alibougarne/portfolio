import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL = "https://portfolio-nest-api.herokuapp.com"
Vue.prototype.$axios.interceptors.request.use((config:any) => {
    // Concatenate base path if not an absolute URL
    config.url = config.url.replace('/api','');
    return config;
  });
