import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_post, addPostSaga } from '../redux/modules/upload';
import { resetComment } from '../redux/modules/comment';

// styles
import { StyledButton } from '../components/upload/UploadDetails.style';

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
  image_path: Array<Object>;
}

const UploadContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetComment());
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

  const image = useCallback((img: Array<Object>) => {
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

  const onsubmit = (e: any) => {
    dispatch(add_post(data));
    dispatch(addPostSaga());
  };

  return (
    <>
      <UploadHeader />
      <UploadInput image={image} data={data} />
      <UploadDetails change={onchange} data={data} />
      <StyledButton onClick={onsubmit}>계시하기</StyledButton>
    </>
  );
};

export default UploadContainer;
