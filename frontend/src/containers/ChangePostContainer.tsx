import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_post, addPostSaga } from '../redux/modules/upload';
import { getSelectedPostSaga } from '../redux/modules/post';
import { useLocation } from 'react-router-dom';
import RootState from '../type';

// components;
import UploadHeader from '../components/upload/UploadHeader';
import UploadInput from '../components/upload/UploadInput';
import UploadDetails from '../components/upload/UploadDetails';

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

const ChangePostContainer = () => {
  const dispatch = useDispatch();
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
  const selectedPostId = +useLocation().pathname.split('/')[2];
  const { selectedPost } = useSelector(({ posts }: RootState) => posts.selectedPost);

  useEffect(() => {
    dispatch(getSelectedPostSaga(selectedPostId));
  }, [dispatch, selectedPostId]);

  useEffect(() => {
    if (!!selectedPost) {
      setData(state => ({
        ...state,
        id: selectedPost.id + '',
        user_id: selectedPost.user_id + '',
        post_context: selectedPost.post_context,
        post_anotheruser: selectedPost.post_anotheruser,
        post_location: selectedPost.post_location,
        tag: selectedPost.hastag,
      }));
    }
  }, [selectedPost]);

  const image = useCallback((img: Array<string>) => {
    setData(data => ({
      ...data,
      image_path: img,
    }));
  }, []);

  const hasTag = useCallback((tag: Array<string>) => {
    setData(data => ({
      ...data,
      tag: tag,
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
      <UploadDetails change={onchange} data={data} hasTag={hasTag} />
    </>
  );
};

export default ChangePostContainer;
