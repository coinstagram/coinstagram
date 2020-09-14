import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledSection } from './OtherPostsStyle';

// comonents
import OtherPostList from './OtherPostList';

interface AnotherPostsProps {
  selectedUserId: string;
  getOtherPosts: () => void;
}

function OtherPosts({ selectedUserId, getOtherPosts }: AnotherPostsProps) {
  useEffect(() => {
    getOtherPosts();
  }, [getOtherPosts, selectedUserId]);

  return (
    <StyledSection>
      <h3 className="a11y-hidden">{selectedUserId}님의 다른 게시물</h3>
      <div>
        <dt className="a11y-hidden">user id</dt>
        <dd>
          <Link to={`/${selectedUserId}`}>{selectedUserId}</Link>{' '}
          <span>님의 게시물 더보기</span>
        </dd>
      </div>
      <OtherPostList />
    </StyledSection>
  );
}

export default OtherPosts;
