import axios from 'axios';
import { AuthInfoState, SignupInfoState } from '../../type';

interface IAuthService {
  signin: (user_email: string, user_password: string) => Promise<AuthInfoState>;
  signup: (user_email: string, user_name: string, user_id: string, user_password: string) => Promise<SignupInfoState>;
}

const authService: IAuthService = class {
  static async signin(user_id: string, user_password: string) {
    const res = await axios({
      method: 'POST',
      url: '/api//login',
      data: {
        user_id,
        user_password,
      },
    });
    const { token } = res.data;
    return token;
  }

  static async signup(user_email: string, user_name: string, user_id: string, user_password: string) {
    const res = await axios({
      method: 'POST',
      url: '/api//signin/email',
      data: {
        user_email,
        user_name,
        user_id,
        user_password,
      },
    });
    const { success } = res.data;
    return success;
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
