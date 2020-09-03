import axios from 'axios';

export default class userService {
  static async getUserinfo(user_id: string) {
    const res = await axios.get('/user', {
      params: { user_id },
    });

    return res.data;
  }

  static async getFollowerUsers() {}

  static async getFolloweeUsers() {}
}
