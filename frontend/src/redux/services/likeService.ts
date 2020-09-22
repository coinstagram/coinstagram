import axios from 'axios';
import { userLikesState } from '../../type';

const baseUrl = '/like';

interface ILikeService {
  getLikesPost: (token: null | string, post_id: number) => Promise<userLikesState[]>;
  addLikePost: (token: null | string, post_id: number) => void;
  deleteLikePost: (token: null | string, post_id: number) => void;
}

const LikeService: ILikeService = class {
  static async getLikesPost(token: null | string, post_id: number) {
    const res = await axios.get<userLikesState[]>(`/api/post${baseUrl}/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async addLikePost(token: null | string, post_id: number) {
    await axios.post(
      `/api/post${baseUrl}`,
      {
        post_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async deleteLikePost(token: null | string, post_id: number) {
    await axios.delete(`/api/post${baseUrl}/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default LikeService;
