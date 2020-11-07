import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_post, addPostSaga } from '../redux/modules/upload';
import { resetMyComment } from '../redux/modules/comment';

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

const UploadContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetMyComment());
  }, [dispatch]);

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
      <UploadDetails hasTag={hasTag} change={onchange} data={data} />
    </>
  );
};

export default UploadContainer;
