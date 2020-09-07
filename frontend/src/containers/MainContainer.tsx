import React, { useEffect, useCallback, createContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// components
import FollowUsers from '../components/story/FollowUsers';
import PostList from '../components/post/PostList';
import RecommendUsers from '../components/recommend/RecommendUsers';
import RootState from '../type';
import {
  getUserInfoSaga,
  followUserSaga,
  cancelFollowUserSaga,
} from '../redux/modules/userInfo';

export interface contextValue {
  loading: boolean;
  error: null | Error;
  follow: (
    user_id: string,
    user_name: string,
    user_profile: null | string,
  ) => void;
  cancelFollow: (user_id: string) => void;
}

export const followContext = createContext<null | contextValue>(null);

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
  const { userInfo } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    function getUser() {
      dispatch(getUserInfoSaga());
    }

    getUser();
  }, [dispatch]);

  const follow = useCallback(
    (user_id: string, user_name: string, user_profile: null | string) => {
      dispatch(followUserSaga(user_id, user_name, user_profile));
    },
    [dispatch],
  );

  const cancelFollow = useCallback(
    (user_id: string) => {
      dispatch(cancelFollowUserSaga(user_id));
    },
    [dispatch],
  );

  const value = {
    loading: userInfo.followers.loading,
    error: userInfo.followers.error,
    follow,
    cancelFollow,
  };

  return (
    <followContext.Provider value={value}>
      <StyledDiv>
        <div className="list-container">
          <FollowUsers
            loading={userInfo.followers.loading}
            error={userInfo.followers.error}
            followers={userInfo.followers.users}
          />
          <PostList />
        </div>
        <div className="recommend-container">
          <RecommendUsers
            loading={userInfo.loading}
            error={userInfo.error}
            user={userInfo.user}
            randomUsers={userInfo.randomUsers}
            followers={userInfo.followers.users}
          />
        </div>
      </StyledDiv>
    </followContext.Provider>
  );
}

export default React.memo(MainContainer);
