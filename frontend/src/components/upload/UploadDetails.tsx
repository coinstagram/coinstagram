import React from 'react';
import { StyledText } from './UploadDetails.style';

interface UploadDetailsProps {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}

const UploadDetails: React.FC<UploadDetailsProps> = ({ change }) => {
  return (
    <>
      <StyledText id="context" placeholder="문구를 입력해 주세요." onChange={change} />
      {/* <StyledDiv>
          <label htmlFor="people">사람 태그하기</label>
          <input id="people" type="text" onChange={change} />
        </StyledDiv>
        <StyledDiv>
          <label htmlFor="location">위치 추가</label>
          <input id="location" type="text" onChange={change} />
        </StyledDiv> */}
    </>
  );
};

export default UploadDetails;
