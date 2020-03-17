import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/modules/auth/auth.module';
import LoginDto from '@/store/modules/auth/dto/loginDto';
@Component({
  components: {  }
})
export default class LoginPage extends Vue {
  private loginDto: LoginDto = new LoginDto;
  private isAuthenticating: boolean = false;
  private loadingPercentage: number = 0;
  private interval: NodeJS.Timeout | any;
  
  get isAuthenticated() { return authModule.get_authenticated}
  async login():Promise<void>{
    this.isAuthenticating = true
    this.$q.loading.show({
      delay: 400 // ms
    });
    this.startComputing(300);
    await authModule.login(this.loginDto)
    setTimeout(()=>{
      this.$q.loading.hide();
      this.isAuthenticating = false;
      if(this.isAuthenticated){
        this.$router.push("/admin/home")
      }
    },1000)
  }

  startComputing(repeatTime:number) {
    this.loadingPercentage = 0
    this.interval = setInterval(() => {
      this.loadingPercentage += Math.floor(Math.random() * 8 + 10)
      if (this.loadingPercentage >= 100) {
        clearInterval(this.interval)
      }
    }, repeatTime)
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