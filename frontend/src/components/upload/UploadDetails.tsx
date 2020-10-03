import React, { useRef } from 'react';
import { StyledText } from './UploadDetails.style';
import { contextValue } from '../../containers/ChangePostContainer';
import HashTag from './HashTag';

interface UploadDetailsProps {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  data?: contextValue;
}

const UploadDetails: React.FC<UploadDetailsProps> = ({ change, data }) => {
  const contextRef = useRef();
  const peopleRef = useRef();
  // const locationRef = useRef();
  return (
    <>
      <StyledText id="context" placeholder="문구를 입력해 주세요." onChange={change} value={!data ? '' : data.post_context} ref={contextRef} />{' '}
      <HashTag />
      {/* <StyledDiv>
        <label htmlFor="people">태그하기</label>
        <input id="people" type="text" onChange={change} value={!data ? '' : data.post_anotheruser} ref={peopleRef} />
      </StyledDiv> */}
      {/* <StyledDiv>
          <label htmlFor="location">위치 추가</label>
          <input id="location" type="text" onChange={change} />
        </StyledDiv> */}
    </>
  );
};

export default UploadDetails;
