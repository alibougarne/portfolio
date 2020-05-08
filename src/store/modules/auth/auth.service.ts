import Axios, { AxiosResponse } from 'axios';
import LoginDto from './dto/loginDto';
import ResponseDto from './dto/responseDto';

export default class AuthService {

  static async login(loginDto: LoginDto): Promise<ResponseDto> {
    let responseDto: ResponseDto = new ResponseDto();
    await Axios.post('login', loginDto).then((response: AxiosResponse) => {
      // console.log('%c⧭ response ===> ', 'color: #e50000', response);
      responseDto.acces_token =
        response.data && response.data.access_token
          ? response.data.access_token
          : '';
      responseDto.message =
        response.data && response.data.message
          ? response.data.message
          : 'Login success';
      responseDto.status = responseDto.acces_token ? 'success' : 'failed';
    });
    // console.log('%c⧭', 'color: #733d00', responseDto);
    return responseDto;
  }

  async loginSirv(){
    try {
      let tokenSirv = "";
      await Axios.get('sirv').then((response: AxiosResponse) => {
        console.log('%c⧭ response sirv ===> ', 'color: #e50000', response);
      }).catch(err=> {
        console.log('%c⧭ response sirv ', 'color: #917399', err);
      });
      return tokenSirv;
    } catch (error) {
      console.log('%c⧭ error login sirv ==> ', 'color: #0088cc', error);
    }
  }
}
