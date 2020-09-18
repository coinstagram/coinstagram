import React from 'react';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';
import RootState from '../../type';
import { useLocation } from 'react-router-dom';

// styles
import { StyledDiv } from './OtherPostListStyle';

// components
import OtherPostItem from './OtherPostItem';

interface OtherPostListProps {
  getPostCounts: (post_id: number) => void;
}

function OtherPostList({ getPostCounts }: OtherPostListProps) {
  const width = useWindowWidth();
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);
  const selectedPostId = +useLocation().pathname.split('/')[2];
  const exceptThisPosts = otherPosts.filter(post => post.id !== selectedPostId);
  return (
    <StyledDiv width={width}>
      <ul>
        {exceptThisPosts.map(post => (
          <OtherPostItem
            key={post.id}
            postId={post.id}
            postOwnerId={post.user_id}
            imageThumbnail={post.image_path}
            getPostCounts={getPostCounts}
          />
        ))}
      </ul>
    </StyledDiv>
  );
}

export default OtherPostList;
