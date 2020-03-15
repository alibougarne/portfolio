import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';
import LoginDto from '@/store/modules/auth/dto/loginDto';
@Component({
  components: {  }
})
export default class LoginPage extends Vue {
  private loginDto: LoginDto = new LoginDto
  async login():Promise<void>{
    await authModule.login(this.loginDto)
  }
  public mounted(): void {
    // this.$q.loading.show({
    //   delay: 400 // ms
    // });
  }
}