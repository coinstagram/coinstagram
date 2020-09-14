import axios from 'axios';
import { postData } from '../modules/upload';
const getUrl = '/post';

const uploadService = class {
  static async uploadPost(data: postData, token: String) {
    token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsInVzZXJfbmFtZSI6IjEiLCJ1c2VyX2dlbmRlciI6bnVsbCwidXNlcl9pbnRyb2R1Y2UiOm51bGwsInVzZXJfcGhvbmUiOm51bGwsInVzZXJfZW1haWwiOiIxIiwidXNlcl9wcm9maWxlIjpudWxsLCJpYXQiOjE2MDAwOTUyMzMsImV4cCI6MTYwMDcwMDAzM30.9-qcZA4LwwmgM8wwm4EcAPiA83frfsplRI7SHqnqeAE';

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
    console.log(post_id, data.image);

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
