import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../type';
import { useLocation } from 'react-router-dom';
import { getAnotherUserSaga } from '../redux/modules/anotherUser';
import { getSelectedPostSaga, deletePostSaga } from '../redux/modules/post';
import { addPostComment, getSelectedComments, resetComment } from '../redux/modules/comment';
import { cancelFollowUserSaga, followUserSaga } from '../redux/modules/userInfo';
import { addPostLikeSaga, deletePostLikeSaga, getSelectedPostLikesSaga } from '../redux/modules/like';
import { addBookmarkSaga, deleteBookmarkSaga } from '../redux/modules/bookmark';
import { getOtherPostsSaga, getPostCountsSaga } from '../redux/modules/otherPost';
import { followContext } from '../App';

// components
import SelectedPost from '../components/post/SelectedPost';
import OtherPosts from '../components/post/OtherPosts';

function UserPostsContainer() {
  const { user_id } = useContext(followContext);
  const { user } = useSelector((state: RootState) => state.anotherUserInfo);
  const dispatch = useDispatch();

  const selectedUserId = user && user.user_id;
  const selectedUserName = user && user.user_name;
  const selectedUserProfile = user && user.user_profile;
  const selectedPostId = +useLocation().pathname.split('/')[2];

  const getSelectedPostInfo = useCallback(() => {
    dispatch(getSelectedPostSaga(selectedPostId));
  }, [dispatch, selectedPostId]);

  useEffect(() => {
    dispatch(getSelectedComments(selectedPostId));
  }, [dispatch, selectedPostId]);

  useEffect(() => {
    dispatch(getSelectedPostLikesSaga(selectedPostId));
  }, [dispatch, selectedPostId]);

  useEffect(() => {
    dispatch(getAnotherUserSaga(user_id));
  }, [dispatch, user_id]);

  useEffect(() => {
    dispatch(resetComment());
  }, [dispatch]);

  const addCommentPost = useCallback(
    (post_id: number, comment_text: string, myProfile: string) => {
      dispatch(addPostComment(post_id, comment_text, myProfile));
    },
    [dispatch],
  );

  const addPostLikes = useCallback(
    (post_id: number) => {
      dispatch(addPostLikeSaga(post_id));
    },
    [dispatch],
  );

  const deletePostLike = useCallback(
    (post_id: number) => {
      dispatch(deletePostLikeSaga(post_id));
    },
    [dispatch],
  );

  const follow = useCallback(() => {
    dispatch(followUserSaga(selectedUserId, selectedUserName, selectedUserProfile));
  }, [dispatch, selectedUserId, selectedUserName, selectedUserProfile]);

  const cancelFollow = useCallback(() => {
    dispatch(cancelFollowUserSaga(selectedUserId));
  }, [dispatch, selectedUserId]);

  const deletePost = useCallback(
    (post_id: number) => {
      dispatch(deletePostSaga(post_id));
    },
    [dispatch],
  );

  const addBookmark = useCallback(
    (post_id: number) => {
      dispatch(addBookmarkSaga(post_id));
    },
    [dispatch],
  );

  const deleteBookmark = useCallback(
    (post_id: number) => {
      dispatch(deleteBookmarkSaga(post_id));
    },
    [dispatch],
  );

  const getOtherPosts = useCallback(() => {
    dispatch(getOtherPostsSaga(selectedUserId));
  }, [dispatch, selectedUserId]);

  const getPostCounts = useCallback(
    (post_id: number) => {
      dispatch(getPostCountsSaga(post_id));
    },
    [dispatch],
  );

  return (
    <>
      <SelectedPost
        selectedUserId={selectedUserId}
        selectedUserProfile={selectedUserProfile}
        selectedPostId={selectedPostId}
        getSelectedPostInfo={getSelectedPostInfo}
        addCommentPost={addCommentPost}
        addPostLikes={addPostLikes}
        deletePostLike={deletePostLike}
        follow={follow}
        cancelFollow={cancelFollow}
        deletePost={deletePost}
        addBookmark={addBookmark}
        deleteBookmark={deleteBookmark}
      />
      <OtherPosts selectedUserId={selectedUserId} getOtherPosts={getOtherPosts} getPostCounts={getPostCounts} />
    </>
  );
}

export default UserPostsContainer;
