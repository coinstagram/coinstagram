import React from 'react';

// styles
import { StyledDiv } from './FeedBodyStyle';

// components
import PostImgSlider from './FeedImgSlider';

function FeedBody() {
  return (
    <StyledDiv>
      <PostImgSlider />
    </StyledDiv>
  );
}

export default FeedBody;
