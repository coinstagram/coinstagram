import axios from 'axios';
import { UserInfoState, AnotherUserState } from '../../type';

interface IUserService {
  getUserInfo: (token: string | null) => Promise<UserInfoState>;
  getRandomUser: () => Promise<AnotherUserState>;
}

const UserService: IUserService = class {
  static async getUserInfo(token: string | null): Promise<UserInfoState> {
    const res = await axios.get<UserInfoState>('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getRandomUser() {
    const res = await axios.get<AnotherUserState>('/users/random');

    return res.data;
  }
};

export default UserService;
