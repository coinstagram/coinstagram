

// const {user_id, user_password} = AuthInfoState;
// export const signin = async (({user_id, user_password}),AuthInfoState) => {
    //     const response = await axios.post('/login', {user_id, user_password});
    //     return {token:response.data.accessToken};
// }
import axios from 'axios';
import { AuthInfoState } from '../../type';

interface IAuthService {
    signin : (user_email : string | null, user_password : sting | null) => Promise
}

export default const authService: IAuthService = class {
  static async singin({ user_email, user_password }) {
    const { data } = await axios({
      method: 'POST',
      url: '/login',
      data: {
        user_email,
        user_password,
      },
    });
    return data;
  }

  static async signup(user) {
    const { data } = await axios({
      method: 'POST',
      url: '/signin',
      data: user,
    });
    return data;
  }

  static async logout() {
    const { data } = await axios({
      method: 'POST',
      //   url:
    });
    return data;
  }
}
