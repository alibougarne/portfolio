import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';
import LoginDto from '@/store/modules/auth/dto/loginDto';
import ButtonMixin from '@/mixins/buttons'
import { Mixins } from 'vue-property-decorator';
@Component({
  components: {  }
})
export default class LoginPage extends Mixins(ButtonMixin) {
  private loginDto: LoginDto = new LoginDto;

  
  get isAuthenticated() { return authModule.get_authenticated}
  async login():Promise<void>{
    this.isProcessing = true
    this.$q.loading.show({
      delay: 400 // ms
    });
    this.startComputing(300);
    await authModule.login(this.loginDto)
    setTimeout(()=>{
      this.$q.loading.hide();
      this.isProcessing = false;
      if(this.isAuthenticated){
        this.$router.push("/admin/home")
      }
    },1000)
  }

beforeDestroy () {
  clearInterval(this.interval)
}
  public mounted(): void {
    // this.$q.loading.show({
    //   delay: 400 // ms
    // });
  }
}