import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';

@Component({})
export default class AdminLayout extends Vue {
  leftDrawerOpen: boolean = false;
  private links: object[] = [
    { icon: 'mdi-tag', text: 'Tags',caption: 'Create and manage tags', path:'/admin/tags' },
    { icon: 'mdi-git', text: 'Projects',caption: 'Create and manage projects', path:'/admin/tags' },
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
  public mounted(): void {}
}
