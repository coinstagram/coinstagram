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

  const selectedUserId = user && user.user_id;
  const selectedUserName = user && user.user_name;
  const selectedUserProfile = user && user.user_profile;
  const selectedPostId = +useLocation().pathname.split('/')[2];

  useEffect(() => {
    dispatch(getSelectedPostSaga(selectedPostId));
  }, [dispatch, selectedPostId]);

  useEffect(() => {
    if (!user_id) return;
    dispatch(getAnotherUserSaga(user_id));
  }, [dispatch, user_id]);

  const getUserPosts = useCallback(() => {
    dispatch(getUserPostsSaga(selectedUserId));
  }, [dispatch, selectedUserId]);

  // const getSelectedPost = useCallback(() => {
  //   dispatch(getSelectedPostSaga(postId));
  // }, [dispatch, postId]);

  const getCommentsPost = useCallback(() => {
    dispatch(getPostComments(selectedPostId));
  }, [dispatch, selectedPostId]);

  const addCommentPost = useCallback(
    (post_id: number, comment_text: string) => {
      dispatch(addPostComment(post_id, comment_text));
    },
    [dispatch],
  );

  const follow = useCallback(() => {
    dispatch(
      followUserSaga(selectedUserId, selectedUserName, selectedUserProfile),
    );
  }, [dispatch, selectedUserId, selectedUserName, selectedUserProfile]);

  const cancelFollow = useCallback(() => {
    dispatch(cancelFollowUserSaga(selectedUserId));
  }, [dispatch, selectedUserId]);

  return (
    <>
      <SelectedPost
        selectedUserId={selectedUserId}
        selectedUserProfile={selectedUserProfile}
        selectedPostId={selectedPostId}
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
