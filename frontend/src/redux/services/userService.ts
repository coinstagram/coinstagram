import axios, { AxiosResponse } from 'axios';
import { UserInfoState } from '../../type';

export default class userService {
  static async getUserinfo(userId: string) {
    const res: AxiosResponse<UserInfoState> = await axios.get('/user', {
      params: { user_id: userId },
    });

    return res.data;
  }
}
