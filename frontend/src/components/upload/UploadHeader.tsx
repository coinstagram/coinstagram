import React from 'react';
import { StyledDiv } from './UploadHeader.style';
// import Thumbnail from '../common/Thumbnail';

function UploadHeader() {
  return (
    <StyledDiv>
      {/* <Thumbnail size={35} imageUrl={profile === undefined ? profileRef.current : profile} /> */}
      <div>새 게시물 작성</div>
    </StyledDiv>
  );
}

export default UploadHeader;
