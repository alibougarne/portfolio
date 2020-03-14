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
  public async login(loginDto:LoginDto) {
    let accessToken: string | null = localStorage.getItem("acces_token");
    if (!accessToken){
      accessToken = await this.authService.login(loginDto);
      this.setAccessToken(accessToken);
      localStorage.setItem("acces_token",accessToken);
    }
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import AuthService from './auth.service';
import LoginDto from './dto/loginDTO';
export const businesslinesModule = new AuthModule({
  store,
  name: 'auth'
});
