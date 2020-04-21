import Vue from 'vue';
import Component from 'vue-class-component';

import { getModule } from 'vuex-module-decorators';
import LayoutStoreModule from './LayoutStoreModule';
import Axios, { AxiosAdapter, AxiosResponse } from 'axios';

@Component
export default class MyLayout extends Vue {
  private store = getModule(LayoutStoreModule);
  private copyright: string = `&copy; Made with ❤️ by <b style="color:$grey-8">Ali Bougarne</b> ${new Date().getFullYear()}`;
  private get leftDrawerOpen() {
    return this.store.leftDrawerOpen;
  }

  private set leftDrawerOpen(value: boolean) {
    this.store.setLeftDrawerOpen(value);
  }

  private get currentMenu():string{
    // (document as any).querySelector("body").classList.add(this.$route.name);
    return this.$route.name?this.$route.name:'';
  }
  // leftDrawerOpen: boolean = false;
  private search: string = '';
  private links1: object[] = [
    { icon: 'home', text: 'Home', path:'/' },
    { icon: 'mdi-tag-multiple', text: 'Tags',path:'/tags' },
    { icon: 'mdi-tablet-cellphone ', text: 'Projects',path:'/projects' }
  ];
  private socials: object[] = [
    { icon: 'mdi-linkedin', text: 'LinkedIn', color:'#0077b5',link:'https://www.linkedin.com/in/ali-bougarne-572470117/' },
    { icon: 'mdi-gmail', text: 'Gmail', color:'#aa3528',link:'mailto:bougarne.ali@gmail.com' },
    { icon: 'mdi-github-circle', text: 'Github', color:'#fff',link:'https://github.com/alibougarne/' },
    { icon: 'mdi-twitter', text: 'Twitter', color:'#1da1f2',link:'#' },
    { icon: 'mdi-facebook', text: 'Facebook', color:'#4267b2',link:'#' },
  ];
  private links3: object[] = [
    { icon: 'fab fa-youtube', text: 'YouTube Premium' },
    { icon: 'local_movies', text: 'Movies & Shows' },
    { icon: 'videogame_asset', text: 'Gaming' },
    { icon: 'live_tv', text: 'Live' }
  ];
  private links4: object[] = [
    { icon: 'settings', text: 'Settings' },
    { icon: 'flag', text: 'Report history' },
    { icon: 'help', text: 'Help' },
    { icon: 'feedback', text: 'Send feedback' }
  ];

  public mounted(): void {
  }
}