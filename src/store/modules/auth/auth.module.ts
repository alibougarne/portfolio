import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class AuthModule extends VuexModule {
  // state
  private accessToken: string = '';
  private authService: AuthService = new AuthService();
  // mutations
  @Mutation
  private setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async login(loginDto: LoginDto) {
    // let accessToken: string | null = localStorage.getItem("acces_token");
    let responseDto:ResponseDto =new ResponseDto;
    // if (!accessToken){
    responseDto = await this.authService.login(loginDto);
    if (responseDto.status === 'success' && responseDto.acces_token && responseDto.message){
      sessionStorage.setItem('acces_token', responseDto.acces_token);
      this.setAccessToken(responseDto.acces_token); 
      Notify.create({
        message: responseDto.message || "",
        color: 'green'
      });
    }else{
      Notify.create({
        message: responseDto.message || "",
        color: 'red'
      });
    }
   
    // }
  }
}

// register module (could be in any file 😅)
import { Notify } from 'quasar'
import store from '@/store/index';
import AuthService from './auth.service';
import LoginDto from './dto/loginDto';
import ResponseDto from './dto/responseDto';
export const authModule = new AuthModule({
  store,
  name: 'auth'
});
