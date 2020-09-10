import React, {
  useEffect,
  useCallback,
  createContext,
  useState,
  useContext,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  getUserInfoSaga,
  followUserSaga,
  cancelFollowUserSaga,
} from '../redux/modules/userInfo';
import { ModalContext } from '../App';

// components
import FollowUsersContainer from './FollowUsersContainer';
import RecommendUsersContainer from './RecommendUsersContainer';
import FeedContainer from './FeedContainer';
import FollowCancelModal from '../components/common/FollowCancelModal';
import PostModal from '../components/common/PostModal';

export interface contextValue {
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
  changePostId: (post_id: number) => void;
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

interface ModalState {
  user_id: string;
  user_profile: null | string;
  targetEl: null | HTMLSpanElement;
}

function HomeMain() {
  const dispatch = useDispatch();
  const [followModalState, setFollowModalState] = useState<ModalState>({
    user_id: '',
    user_profile: null,
    targetEl: null,
  });
  const [postId, setPostId] = useState<number>(0);
  const { followModal, postModal, popPostModal, popFollowModal } = useContext(
    ModalContext,
  );

  const { user_id, user_profile, targetEl } = followModalState;

  useEffect(() => {
    dispatch(getUserInfoSaga());
  }, [dispatch]);

  const changePostId = useCallback((post_id: number) => {
    setPostId(post_id);
  }, []);

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
    follow,
    setFollowInfo,
    changePostId,
  };

  return (
    <followContext.Provider value={value}>
      <StyledDiv>
        <div className="list-container">
          <FollowUsersContainer />
          <FeedContainer />
        </div>
        <div className="recommend-container">
          <RecommendUsersContainer />
        </div>
      </StyledDiv>
      {followModal && (
        <FollowCancelModal
          user_id={user_id}
          user_profile={user_profile}
          targetEl={targetEl ? targetEl : undefined}
          cancelFollow={cancelFollow}
          popFollowModal={popFollowModal}
        />
      )}
      {postModal && (
        <PostModal
          popPostModal={popPostModal}
          popFollowModal={popFollowModal}
          postId={postId}
          userId={user_id}
        />
      )}
    </followContext.Provider>
  );
}

export default React.memo(HomeMain);
