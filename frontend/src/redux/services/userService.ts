import axios from 'axios';
import { UserResponseState, AnotherUserState, UserState } from '../../type';

const getUrl = '/user';
const followUrl = '/user/relationship';

interface IUserService {
  getUserData: (token: string | null) => Promise<UserResponseState>;
  getRandomUser: () => Promise<AnotherUserState[]>;
  getAnotherUserData: (userId: string) => Promise<UserState>;
  followUser: (userid: string, token: string | null) => void;
  CancelFollowUser: (userid: string, token: string | null) => void;
}

const UserService: IUserService = class {
  static async getUserData(token: string | null): Promise<UserResponseState> {
    const res = await axios.get<UserResponseState>(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getRandomUser() {
    const res = await axios.get<AnotherUserState[]>(`${getUrl}s/random`);

    return res.data;
  }

  static async getAnotherUserData(userId: string) {
    const res = await axios.get<UserState>(`${getUrl}/${userId}`);

    return res.data;
  }

  static async followUser(userId: string, token: string | null) {
    try {
      await axios.post(
        followUrl,
        {
          followee_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  static async CancelFollowUser(userId: string, token: string | null) {
    try {
      await axios.delete(`${followUrl}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default UserService;
