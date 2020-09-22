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
  user_id: String;
  post_context: String;
  post_anotheruser: String;
  post_location: String;
  tag: Array<String>;
  image: Array<Object>;
}

const UploadContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetComment());
  }, [dispatch]);

  const [data, setData] = useState<contextValue>({
    user_id: '',
    post_context: '',
    post_anotheruser: '',
    post_location: '',
    tag: [],
    image: [],
  });

  const image = useCallback((img: Array<Object>) => {
    setData(data => ({
      ...data,
      image: img,
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
      <UploadInput image={image} />
      <UploadDetails change={onchange} />
      <StyledButton onClick={onsubmit}>게시하기</StyledButton>
    </>
  );
};

export default UploadContainer;
