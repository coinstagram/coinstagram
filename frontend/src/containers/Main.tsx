import React, {
  useEffect,
  useCallback,
  createContext,
  useState,
  useContext,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../type';
import {
  getUserInfoSaga,
  followUserSaga,
  cancelFollowUserSaga,
} from '../redux/modules/userInfo';

// components
import FollowUsers from '../components/story/FollowUsers';
import PostList from '../components/post/PostList';
import RecommendUsers from '../components/recommend/RecommendUsers';
import FollowCancelModal from '../components/FollowCancelModal';
import { ModalContext } from '../App';

export interface contextValue {
  loading: boolean;
  error: null | Error;
  follow: (
    user_id: string,
    user_name: string,
    user_profile: null | string,
  ) => void;
  setFollowInfo: (
    user_id: string,
    user_profile: null | string,
    targetEl: null | HTMLSpanElement,
  ) => void;
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

interface MainProps {
  user_id: string;
  user_profile: null | string;
  targetEl: null | HTMLSpanElement;
}

function Main() {
  const { userInfo } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [followModalState, setFollowModalState] = useState<MainProps>({
    user_id: '',
    user_profile: null,
    targetEl: null,
  });
  const { followModal } = useContext(ModalContext);

  const { user_id, user_profile, targetEl } = followModalState;

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

  const cancelFollow = useCallback(() => {
    dispatch(cancelFollowUserSaga(user_id));
  }, [dispatch, user_id]);

  const setFollowInfo = useCallback(
    (
      user_id: string,
      user_profile: null | string,
      targetEl: null | HTMLSpanElement,
    ) => {
      setFollowModalState({
        user_id,
        user_profile,
        targetEl,
      });
    },
    [],
  );

  const value = {
    loading: userInfo.followers.loading,
    error: userInfo.followers.error,
    follow,
    setFollowInfo,
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
      {followModal && (
        <FollowCancelModal
          user_id={user_id}
          user_profile={user_profile}
          targetEl={targetEl ? targetEl : undefined}
          cancelFollow={cancelFollow}
        />
      )}
    </followContext.Provider>
  );
}

export default React.memo(Main);
