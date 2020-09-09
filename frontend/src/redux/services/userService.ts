import axios from 'axios';
import { UserResponseState, AnotherUserState } from '../../type';

const getUrl = '/user';
const followUrl = '/user/relationship';

interface IUserService {
  getUserData: (token: string | null) => Promise<UserResponseState>;
  getRandomUser: (token: string | null) => Promise<AnotherUserState[]>;
  getAnotherUserData: (
    user_Id: string,
    token: string | null,
  ) => Promise<UserResponseState>;
  followUser: (userid: string, token: string | null) => void;
  CancelFollowUser: (userid: string, token: string | null) => void;
}

const UserService: IUserService = class {
  static async getUserData(token: string | null) {
    const res = await axios.get<UserResponseState>(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getAnotherUserData(user_id: string, token: string | null) {
    const res = await axios.get<UserResponseState>(`${getUrl}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getRandomUser(token: string | null) {
    const res = await axios.get<AnotherUserState[]>(`${getUrl}s/random`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
