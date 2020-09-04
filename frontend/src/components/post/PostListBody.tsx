import React from 'react';
import styled from 'styled-components';

// components
import PostImgSlider from './PostImgSlider';

const StyledDiv = styled.div`
  /* height: 614px; */
  border-bottom: 1px solid rgb(219, 219, 219); /* 나중에 지워야함, 임시 경계 */
`;

function PostListBody() {
  return (
    <StyledDiv>
      <PostImgSlider />
    </StyledDiv>
  );
}

export default PostListBody;
