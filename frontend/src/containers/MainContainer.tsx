import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// components
import FollowUsers from '../components/story/FollwUsers';
import PostList from '../components/post/PostList';
import RecommendUsers from '../components/recommend/RecommendUsers';
import RootState from '../type';
import { getUserInfo } from '../redux/modules/user';

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

function MainContainer() {
  const { user, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    function getUser(token: string | null) {
      dispatch(getUserInfo(token));
    }

    getUser(auth.token);
  }, [auth.token, dispatch]);

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

export default MainContainer;
