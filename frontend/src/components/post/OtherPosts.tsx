import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOtherPost } from '../../redux/modules/otherPost';

// styles
import { StyledSection } from './OtherPostsStyle';

// comonents
import OtherPostList from './OtherPostList';

interface AnotherPostsProps {
  selectedUserId: string;
  getOtherPosts: () => void;
  getPostCounts: (post_id: number) => void;
}

function OtherPosts({ selectedUserId, getOtherPosts, getPostCounts }: AnotherPostsProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    getOtherPosts();
    return () => dispatch(resetOtherPost());
  }, [getOtherPosts, dispatch]);

  return (
    <StyledSection>
      <h3 className="a11y-hidden">{selectedUserId}님의 다른 게시물</h3>
      <div>
        <dt className="a11y-hidden">user id</dt>
        <dd>
          <Link to={`/account/${selectedUserId}`}>{selectedUserId}</Link> <span>님의 게시물 더보기</span>
        </dd>
      </div>
      <OtherPostList getPostCounts={getPostCounts} />
    </StyledSection>
  );
}

export default OtherPosts;
