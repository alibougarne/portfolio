import Vue from 'vue';
import Component from 'vue-class-component';
import Axios, { AxiosResponse } from 'axios';
import LoginDto from '~/src/store/modules/auth/dto/loginDTO';
@Component({
  components: {  }
})
export default class LoginPage extends Vue {
  private loginDto: LoginDto = {
    email: '',
    password: ''
  }
  login():void{

  }
  public mounted(): void {
    // this.$q.loading.show({
    //   delay: 400 // ms
    // });
  }
}