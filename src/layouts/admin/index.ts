import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';

@Component({})
export default class AdminLayout extends Vue {
  leftDrawerOpen: boolean = false;
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
