import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import { authModule } from '../store/modules/auth/auth.module';
import axios from 'axios';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(/*{ store, ssrContext }*/) {
  const token = sessionStorage.getItem('acces_token');
  // console.log('%c⧭ index.ts ', 'color: #00bf00');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    authModule.setAuthenticatedStatus(true);
  }
  // console.log(
  //   '%c⧭ store ====> route r ',
  //   'color: #0088cc',
  //   authModule.get_authenticated
  // );
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
