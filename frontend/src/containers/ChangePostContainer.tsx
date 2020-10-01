import React, { useCallback, useEffect, useState } from 'react';

// components;
import UploadHeader from '../components/upload/UploadHeader';
import UploadInput from '../components/upload/UploadInput';
import UploadDetails from '../components/upload/UploadDetails';
import { useDispatch, useSelector } from 'react-redux';
import { add_post, addPostSaga } from '../redux/modules/upload';
import { getSelectedPostSaga } from '../redux/modules/post';
import { useLocation } from 'react-router-dom';
import RootState from '../type';

export interface contextValue {
  id: string;
  user_id: string;
  post_context: string;
  post_anotheruser: string;
  post_location: string;
  created_at: string;
  tag: Array<string>;
  image_path: Array<string>;
}
interface test {
  getSelectedPostInfo: () => void;
}

const ChangePostContainer = () => {
  const [data, setData] = useState<contextValue>({
    id: '',
    user_id: '',
    post_context: '',
    post_anotheruser: '',
    post_location: '',
    created_at: '',
    tag: [],
    image_path: [],
  });
  const dispatch = useDispatch();

  const selectedPostId = +useLocation().pathname.split('/')[2];
  useEffect(() => {
    dispatch(getSelectedPostSaga(selectedPostId));
  }, [dispatch, selectedPostId]);

  const { selectedPost } = useSelector(({ posts }: RootState) => posts.selectedPost);

  useEffect(() => {
    if (!!selectedPost) {
      setData(state => ({
        ...state,
        id: selectedPost.id + '',
        user_id: selectedPost.user_id + '',
        post_context: selectedPost.post_context,
        post_anotheruser: selectedPost.post_anotheruser,
        post_location: selectedPost.post_location,
      }));
    }
  }, [selectedPost]);

  const image = useCallback((img: Array<string>) => {
    setData(data => ({
      ...data,
      image_path: img,
    }));
  }, []);

  const onchange = (e: any) => {
    const { id, value } = e.target;
    if (id === 'people') {
      setData({
        ...data,
        post_anotheruser: value,
      });
    } else if (id === 'location') {
      setData({
        ...data,
        post_location: value,
      });
    } else if (id === 'context') {
      setData({
        ...data,
        post_context: value,
      });
    }
  };

  const onsubmit = useCallback(
    (e: any) => {
      dispatch(add_post(data));
      dispatch(addPostSaga());
    },
    [dispatch, data],
  );

  return (
    <>
      <UploadHeader />
      <UploadInput image={image} onsubmit={onsubmit} data={data} />
      <UploadDetails change={onchange} data={data} />
      {/* <StyledButton onClick={onsubmit}>계시하기</StyledButton> */}
    </>
  );
};

export default ChangePostContainer;
