import React, { useState } from 'react';

// components;
import UploadHeader from '../components/upload/UploadHeader';
import UploadInput from '../components/upload/UploadInput';
import UploadDetails from '../components/upload/UploadDetails';
import { StyledButton } from '../components/upload/UploadDetails.style';
import { useDispatch } from 'react-redux';
import { add_post } from '../redux/modules/upload';

export interface contextValue {
  user_id: String;
  post_context: String;
  post_anotheruser: String;
  post_location: String;
  tag: Array<String>;
}

const UploadContainer = () => {
  const [data, setData] = useState<contextValue>({
    user_id: '',
    post_context: '',
    post_anotheruser: '',
    post_location: '',
    tag: [],
  });

  const dispatch = useDispatch();
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

      console.log({ ...data });
    }
  };

  return (
    <>
      <UploadHeader />
      <UploadInput change={onchange} />
      <UploadDetails change={onchange} />
      <StyledButton>계시하기</StyledButton>
    </>
  );
};

export default UploadContainer;
