import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledLi } from './OtherPostItemStyle';

interface OtherPostItemProps {
  postId: number;
  postOwnerId: string;
  imageUrl: string;
}

function OtherPostItem({ postId, postOwnerId, imageUrl }: OtherPostItemProps) {
  return (
    <StyledLi>
      <Link to={`/post/${postId}`}>
        <img src={imageUrl} alt={`${postOwnerId}님의 게시물-${postId}}`} />
      </Link>
    </StyledLi>
  );
}

export default OtherPostItem;
