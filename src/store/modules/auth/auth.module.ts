import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class AuthModule extends VuexModule {
  // state
  private accessToken: string = '';
  private isAuthenticated: boolean = false;
  private authService: AuthService = new AuthService();
  // mutations
  @Mutation
  private setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
  @Mutation
  public setAuthenticatedStatus(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }
  // getters
  get get_authenticated() {
    return this.isAuthenticated;
  }
  // 😅 not yet
  // actions
  @Action
  public async login(loginDto: LoginDto) {
    // let accessToken: string | null = localStorage.getItem("acces_token");
    let responseDto: ResponseDto = new ResponseDto();
    // if (!accessToken){
    responseDto = await this.authService.login(loginDto);
    if (
      responseDto.status === 'success' &&
      responseDto.acces_token &&
      responseDto.message
    ) {
      sessionStorage.setItem('acces_token', responseDto.acces_token);
      this.setAccessToken(responseDto.acces_token);
      this.setAuthenticatedStatus(true);
      setTimeout(() => {
        Notify.create({
          message: responseDto.message || '',
          color: 'green'
        });
      }, 1001);
    } else {
      setTimeout(() => {
        Notify.create({
          message: responseDto.message || '',
          color: 'red'
        });
      }, 1001);
    }
    // }
  }
  @Action
  public async logout() {
    sessionStorage.removeItem('acces_token');
    this.setAccessToken('');
    this.setAuthenticatedStatus(false);
  }
}

// register module (could be in any file 😅)
import { Notify } from 'quasar';
import store from '@/store/index';
import AuthService from './auth.service';
import LoginDto from './dto/loginDto';
import ResponseDto from './dto/responseDto';
export const authModule = new AuthModule({
  store,
  name: 'auth'
});
