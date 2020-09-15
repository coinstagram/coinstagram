import axios from 'axios';
import { AuthState, AuthInfoState, SignupInfoState } from '../../type';

interface IAuthService {
  signin: (user_email: string, user_password: string) => Promise<AuthInfoState>;
  signup: (
    user_email: string,
    user_name: string,
    user_id: string,
    user_password: string,
  ) => Promise<SignupInfoState>;
}

const authService: IAuthService = class {
  static async signin(user_id: string, user_password: string) {
    const res = await axios({
      method: 'POST',
      url: '/login',
      data: {
        user_id,
        user_password,
      },
    });
    console.log('res', res);
    const { success, token } = res.data;
    if (!success) alert('사용자 정보와 일치하지 않습니다');
    // if (token === undefined) alert('사용자 정보와 일치하지 않습니다');
    localStorage.setItem('token', token);
    console.log('token', token);
    return token;
  }

  static async signup(
    user_email: string,
    user_name: string,
    user_id: string,
    user_password: string,
  ) {
    const res = await axios({
      method: 'POST',
      url: '/signin/email',
      data: {
        user_email,
        user_name,
        user_id,
        user_password,
      },
    });
    console.log('res', res);
    const { token } = res.data;
    // localStorage.getItem('token');
    return token;
  }

  // static async logout() {
  //   const { data } = await axios({
  //     method: 'POST',
  //     //   url:
  //   });
  //   return data;
  // }
};
export default authService;
