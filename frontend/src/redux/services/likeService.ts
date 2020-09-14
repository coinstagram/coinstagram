import axios from 'axios';
import { userLikesState } from '../../type';

const baseUrl = '/like';

interface ILikeService {
  getLikesPost: (
    token: null | string,
    post_id: number,
  ) => Promise<userLikesState[]>;
  addLikePost: (token: null | string, post_id: number) => void;
  // getCommentLikes:
  // addCommentLike:
}

const LikeService: ILikeService = class {
  static async getLikesPost(token: null | string, post_id: number) {
    const res = await axios.get<userLikesState[]>(
      `/post${baseUrl}/${post_id}`,
      {
        headers: {
          Authrization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  static async addLikePost(token: null | string, post_id: number) {
    await axios.post(
      `/post${baseUrl}`,
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
};

export default LikeService;
