import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';

@Component({})
export default class AdminLayout extends Vue {
  leftDrawerOpen:boolean= false;
  get isAuthenticated() { return authModule.getter}
  public mounted(): void {
    
  }
}