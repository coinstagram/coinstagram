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

  static async uploadImageView(files: FileList, token: String) {
    if (files !== null) {
      const fd = new FormData();
      [].forEach.call(files, (f: File) => {
        fd.append('image', f);
      });

      const res = await axios.post(`/images`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    }
  }

  static async UserProFile(file: File, token: string | null) {
    const fd = new FormData();
    fd.append('user-profile', file);
    const res = await axios.post(`/image`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await axios.patch(`/user/image`, [{ image: res.data.image_path }], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.image_path;
  }
};

export default uploadService;
