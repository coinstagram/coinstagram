import axios from 'axios';
import { EachCommentState } from '../../type';

const baseUrl = '/comment';

interface ICommentService {
  addComment: (
    token: string | null,
    post_id: number,
    comment_text: string,
  ) => void;
  getComment: (
    token: string | null,
    post_id: number,
  ) => Promise<EachCommentState[]>;
}

const CommentService: ICommentService = class {
  static async addComment(
    token: string | null,
    post_id: number,
    comment_text: string,
  ) {
    await axios.post(
      baseUrl,
      {
        post_id,
        comment_text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async getComment(token: string | null, post_id: number) {
    const res = await axios.get<EachCommentState[]>(
      `${baseUrl}/post/${post_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  // get child?

  // delete comment?

  // like comment?
};

export default CommentService;
