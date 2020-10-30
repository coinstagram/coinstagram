import axios from 'axios';
import { UserResponseState, AnotherUserState, UserState } from '../../type';

const getUrl = '/user';
const followUrl = '/user/relationship';

interface IUserService {
  getUserData: (token: string | null) => Promise<UserResponseState>;
  getRandomUser: (token: string | null) => Promise<AnotherUserState[]>;
  getAnotherUserData: (user_Id: string, token: string | null) => Promise<UserResponseState>;
  followUser: (userid: string, token: string | null) => void;
  CancelFollowUser: (userid: string, token: string | null) => void;
}

interface IEditService {
  edit: (
    user_profile: string,
    user_name: string,
    user_id: string,
    user_introduce: string,
    user_email: string,
    user_phone: string,
    user_gender: string,
  ) => Promise<UserState>;
  delete: (user_id: string) => Promise<UserState>;
}
const UserService: IUserService = class {
  static async getUserData(token: string | null) {
    const res = await axios.get<UserResponseState>(`/api${getUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async getAnotherUserData(user_id: string, token: string | null) {
    const res = await axios.get<UserResponseState>(`/api${getUrl}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getRandomUser(token: string | null) {
    const res = await axios.get<AnotherUserState[]>(`/api${getUrl}s/random`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async followUser(userId: string, token: string | null) {
    try {
      await axios.post(
        `/api${followUrl}`,
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
      await axios.delete(`/api${followUrl}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};
export const editService = class {
  static async edit(
    user_profile: string,
    user_name: string,
    user_id: string,
    user_introduce: string,
    user_email: string,
    user_phone: string,
    user_gender: string,
    token: string,
  ) {
    const res = await axios({
      method: 'PATCH',
      url: '/api/user',
      data: {
        user_profile,
        user_name,
        user_id,
        user_introduce,
        user_email,
        user_phone,
        user_gender,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async delete(user_id: string, token: string) {
    const res = await axios({
      method: 'DELETE',
      url: '/api/user',
      data: {
        user_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
};

export default UserService;
