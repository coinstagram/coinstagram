import axios from 'axios';
import { EachCommentState } from '../../type';

const baseUrl = '/comment';

interface ICommentService {
  addComment: (
    token: string | null,
    post_id: number,
    comment_text: string,
  ) => Promise<EachCommentState>;
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
    const res = await axios.post<EachCommentState>(
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
    console.log(res.data);

    return res.data;
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
