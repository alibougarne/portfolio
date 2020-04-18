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
}
