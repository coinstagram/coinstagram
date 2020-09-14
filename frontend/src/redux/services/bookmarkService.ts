import axios from 'axios';
import { EachPostState } from '../../type';
const baseUrl = '/bookmark';

interface IBookmarkService {
  getBookmarkedId: (token: null | string, user_id: string) => Promise<number[]>;
  addBookmarkPost: (token: null | string, post_id: number) => void;
}

const BookmarkService: IBookmarkService = class {
  static async getBookmarkedId(token: null | string, user_id: string) {
    const res = await axios.get<number[]>(`${baseUrl}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async addBookmarkPost(token: null | string, post_id: number) {
    await axios.post(
      baseUrl,
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

  // deltet bookmark
};

export default BookmarkService;
