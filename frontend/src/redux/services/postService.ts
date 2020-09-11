import axios from 'axios';
import { EachPostState } from '../../type';

// const baseUrl = '/post'

interface IPostService {
  getRandomPosts: (token: string | null) => Promise<EachPostState[]>;
  getFollowersPosts: (token: string | null) => Promise<EachPostState[]>;
  getUserPosts: (
    token: string | null,
    user_id: string,
  ) => Promise<EachPostState[]>;
  getSelectedPost: (
    token: string | null,
    post_id: number,
  ) => Promise<EachPostState>;
}

const PostService: IPostService = class {
  static async getRandomPosts(token: string | null) {
    const res = await axios.get<EachPostState[]>('/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getFollowersPosts(token: string | null) {
    const res = await axios.get<EachPostState[]>('/user/relationship/post', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getUserPosts(token: string | null, user_id: string) {
    const res = await axios.get<EachPostState[]>(`/user/post/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getSelectedPost(token: string | null, post_id: number) {
    const res = await axios.get<EachPostState>(`/post/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  // static async getSelectedPosts()

  // static async deletePosts..

  // static async patchPosts..
};

export default PostService;
