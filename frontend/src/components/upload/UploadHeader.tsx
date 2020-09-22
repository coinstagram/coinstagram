import React from 'react';
import { StyledDiv } from './UploadHeader.style';
import Thumbnail from '../common/Thumbnail';
import RootState from '../../type';
import { useSelector } from 'react-redux';

function UploadHeader() {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const profile = user !== null ? user.user_profile : null;

  return (
    <StyledDiv>
      <Thumbnail size={40} imageUrl={profile} />
      <div>새 게시물 작성</div>
    </StyledDiv>
  );
}

export default UploadHeader;
