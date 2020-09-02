import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// components
import FollowUsers from '../components/story/FollwUsers';
import PostList from '../components/post/PostList';
import RecommendUsers from '../components/recommend/RecommendUsers';

const StyledDiv = styled.div`
  position: relative;

  .list-container {
    max-width: 614px;
  }

  .recommend-container {
    position: absolute;
    top: 0;
    right: 315px;
  }
`;

function Main() {
  // const {} = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(saga 액션creator) 필요
  }, [dispatch]);

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

export default Main;
