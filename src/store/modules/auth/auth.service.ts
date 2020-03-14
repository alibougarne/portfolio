import Axios, { AxiosResponse } from 'axios';
import LoginDto from './dto/loginDTO';

export default class AuthService {
  login(loginDto: LoginDto): string | PromiseLike<string> {
    let token: string = '';
    Axios.post('login', loginDto).then((response: AxiosResponse) => {
      token = response.data.access_token;
    });
    return token;
  }
}
