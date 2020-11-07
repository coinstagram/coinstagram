import axios from 'axios';
import { PostData } from '../../type';
const getUrl = '/post';

const uploadService = class {
  static async uploadPost(data: PostData, token: String) {
    const res = await axios.post(
      `/api${getUrl}`,
      {
        post_context: data.post_context,
        post_anotheruser: data.post_anotheruser,
        post_location: data.post_location,
        post_tags: data.tag
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { id } = res.data;
    const imageRes = await axios.post(
      `/api${getUrl}/image`,
      {
        id,
        image_path: [...data.image_path],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { ...res.data, ...imageRes.data };
  }

  static async uploadImageView(files: FileList, token: String) {
    if (files !== null) {
      const fd = new FormData();
      [].forEach.call(files, (f: File) => {
        fd.append('image', f);
      });

      const res = await axios.post(`/api/images`, fd, {
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

    const res = await axios.post(`/api/image`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await axios.patch(`/api/user/image`, [{ image_path: res.data.image_path }], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.image_path;
  }
};

export default uploadService;
