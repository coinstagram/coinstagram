import axios from 'axios';
import { postData } from '../modules/upload';
const getUrl = '/post';

const uploadService = class {
  static async uploadPost(data: postData, token: String) {
    const res = await axios.post(
      `${getUrl}`,
      {
        post_context: data.post_context,
        post_anotheruser: data.post_anotheruser,
        post_location: data.post_location,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { post_id } = res.data;

    await axios.post(
      `${getUrl}/image`,
      {
        post_id,
        image: [...data.image],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }
};

export default uploadService;
