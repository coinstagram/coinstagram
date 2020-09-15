import React, {
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  followUserSaga,
  cancelFollowUserSaga,
  getUserInfoSaga,
} from '../redux/modules/userInfo';
import { deletePostSaga } from '../redux/modules/post';
import { ModalContext } from '../App';
import { deleteBookmarkSaga } from '../redux/modules/bookmark';
import RootState from '../type';

// components
import FollowUsersContainer from '../containers/FollowUsersContainer';
import RecommendUsersContainer from '../containers/RecommendUsersContainer';
import FeedContainer from '../containers/FeedContainer';
import FollowCancelModal from './common/FollowCancelModal';
import PostModal from './common/PostModal';

interface contextValue {
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

export interface ModalState {
  user_id: string;
  user_profile: null | string;
  targetEl: null | HTMLSpanElement;
}

function HomeMain() {
  const { users } = useSelector((state: RootState) => state.userInfo.followers);
  const { user } = useSelector((state: RootState) => state.userInfo);
  const myId = user && user.user_id;
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
    if (myId) return;
    dispatch(getUserInfoSaga());
  }, [dispatch, myId]);

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

  const deletePost = useCallback(
    (post_id: number) => {
      dispatch(deletePostSaga(post_id));
    },
    [dispatch],
  );

  const deleteBookmark = useCallback(
    (post_id: number) => {
      dispatch(deleteBookmarkSaga(post_id));
    },
    [dispatch],
  );

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
          userProfile={user_profile}
          followers={users}
          follow={follow}
          deletePost={deletePost}
          deleteBookmark={deleteBookmark}
        />
      )}
    </followContext.Provider>
  );
}

export default React.memo(HomeMain);
