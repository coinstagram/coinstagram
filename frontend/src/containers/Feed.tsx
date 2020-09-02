import React from 'react';
import styled from 'styled-components';

// components
import FollowUsers from '../components/FollwUsers';
import PostList from '../components/PostList';
import RecommendUsers from '../components/RecommendUsers';

const StyledDiv = styled.div`
  position: relative;

  .list-container {
    max-width: 614px;
  }

  .recommend-container {
    position: absolute;
    top: 0;
    right: 295px;
  }
`;

function Feed() {
  return (
    <StyledDiv>
      <div className="list-container">
        <FollowUsers />
        <PostList />
      </div>
      <div className="recommend-container">
        <RecommendUsers />
      </div>
    </StyledDiv>
  );
}

export default Feed;
