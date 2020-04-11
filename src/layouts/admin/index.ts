import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';
import { Watch } from 'vue-property-decorator';

@Component({})
export default class AdminLayout extends Vue {
  leftDrawerOpen: boolean = false;
  private links: object[] = [
    { icon: 'mdi-tag', text: 'Tags',caption: 'Create and manage tags', path:'/admin/tags' },
    { icon: 'mdi-git', text: 'Projects',caption: 'Create and manage projects', path:'/admin/projects' },
    { icon: 'mdi-office-building', text: 'Companies',caption: 'Create and manage companies', path:'/admin/tags' },
    { icon: 'mdi-account-tie', text: 'Profile',caption: 'Manage Profile', path:'/admin/tags' },
    { icon: 'mdi-map-marker-radius', text: 'Countries',caption: 'Manage countries', path:'/admin/tags' },
  ];
  get isAuthenticated() {
    console.log(this.$store)
    return authModule.get_authenticated;
  }
  logout(): void {
    this.$q.loading.show({
      delay: 100 // ms
    });
    setTimeout(() => {
      authModule.logout();
      this.$q.notify({
        message: 'Logout succes',
        color: 'primary'
      });
      setTimeout(() => {
        this.$q.loading.hide();
        this.$router.push("/admin")
      }, 200);
    }, 400);
  }
  get currentPathName(): string | null | undefined {
    return this.$route.name;
  }
  @Watch('currentPathName')
  public watchRoutes(current:string, old:string):void {
    console.log('%c⧭ old ', 'color: #e50000', old);
    console.log('%c⧭ current ', 'color: #aa00ff', current);
    if(!this.isAuthenticated && current !== 'login'){
      this.$route.name
      this.$router.push("/admin").catch(err => {});
    }
  }

  public created(): void {
    console.log('%c⧭ isAuthenticated ====> ', 'color: #00a3cc', this.isAuthenticated);
    if(!this.isAuthenticated && this.currentPathName !== 'login'){
      this.$router.push("/admin").catch(err => {
        console.log('%c⧭', 'color: #733d00', err);
      });
    }
  }
}
