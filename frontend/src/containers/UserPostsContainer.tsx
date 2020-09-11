import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../type';
import { useLocation } from 'react-router-dom';
import { getAnotherUserSaga } from '../redux/modules/anotherUser';
import { getUserPostsSaga, getSelectedPostSaga } from '../redux/modules/post';
import { getPostComments, addPostComment } from '../redux/modules/comment';
import {
  cancelFollowUserSaga,
  followUserSaga,
} from '../redux/modules/userInfo';

// components
import SelectedPost from '../components/post/SelectedPost';
import AnotherPosts from '../components/post/AnotherPosts';

function UserPostsContainer() {
  const { selectedPost } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.anotherUserInfo);
  const dispatch = useDispatch();
  const user_id = selectedPost.post && selectedPost.post.user_id;

  const userId = user && user.user_id;
  const userName = user && user.user_name;
  const userProfile = user && user.user_profile;
  const postId = +useLocation().pathname.split('/')[2];

  useEffect(() => {
    dispatch(getSelectedPostSaga(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (!user_id) return;
    dispatch(getAnotherUserSaga(user_id));
  }, [dispatch, user_id]);

  const getUserPosts = useCallback(() => {
    dispatch(getUserPostsSaga(userId));
  }, [dispatch, userId]);

  // const getSelectedPost = useCallback(() => {
  //   dispatch(getSelectedPostSaga(postId));
  // }, [dispatch, postId]);

  const getCommentsPost = useCallback(() => {
    dispatch(getPostComments(postId));
  }, [dispatch, postId]);

  const addCommentPost = useCallback(
    (post_id: number, comment_text: string) => {
      dispatch(addPostComment(post_id, comment_text));
    },
    [dispatch],
  );

  const follow = useCallback(() => {
    dispatch(followUserSaga(userId, userName, userProfile));
  }, [dispatch, userId, userName, userProfile]);

  const cancelFollow = useCallback(() => {
    dispatch(cancelFollowUserSaga(userId));
  }, [dispatch, userId]);

  return (
    <>
      <SelectedPost
        userId={userId}
        userProfile={userProfile}
        postId={postId}
        getUserPosts={getUserPosts}
        getCommentsPost={getCommentsPost}
        addCommentPost={addCommentPost}
        follow={follow}
        cancelFollow={cancelFollow}
      />
      <AnotherPosts />
    </>
  );
}

export default UserPostsContainer;
