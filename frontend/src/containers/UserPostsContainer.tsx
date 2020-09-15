import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../type';
import { useLocation } from 'react-router-dom';
import { getAnotherUserSaga } from '../redux/modules/anotherUser';
import {
  getUserPostsSaga,
  getSelectedPostSaga,
  deletePostSaga,
} from '../redux/modules/post';
import { getPostComments, addPostComment } from '../redux/modules/comment';
import {
  cancelFollowUserSaga,
  followUserSaga,
} from '../redux/modules/userInfo';
import {
  addPostLikeSaga,
  deletePostLikeSaga,
  getPostLikesSaga,
} from '../redux/modules/like';
import {
  addBookmarkSaga,
  deleteBookmarkSaga,
  getBookmarksSaga,
} from '../redux/modules/bookmark';
import {
  getOtherPostsSaga,
  getPostCountsSaga,
} from '../redux/modules/otherPost';

// components
import SelectedPost from '../components/post/SelectedPost';
import OtherPosts from '../components/post/OtherPosts';

function UserPostsContainer() {
  const { selectedPost } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.anotherUserInfo);
  const dispatch = useDispatch();
  const user_id =
    selectedPost.selectedPost && selectedPost.selectedPost.user_id;
  const selectedPostImages =
    selectedPost.selectedPost && selectedPost.selectedPost.image_path;

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

  const getCommentsPost = useCallback(() => {
    dispatch(getPostComments(selectedPostId));
  }, [dispatch, selectedPostId]);

  const addCommentPost = useCallback(
    (post_id: number, comment_text: string) => {
      dispatch(addPostComment(post_id, comment_text));
    },
    [dispatch],
  );

  const getPostLikes = useCallback(
    (post_id: number) => {
      dispatch(getPostLikesSaga(post_id));
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
    dispatch(
      followUserSaga(selectedUserId, selectedUserName, selectedUserProfile),
    );
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

  const getBookmarks = useCallback(
    (user_id: string) => {
      dispatch(getBookmarksSaga(user_id));
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
        selectedPostImages={selectedPostImages}
        getUserPosts={getUserPosts}
        getCommentsPost={getCommentsPost}
        addCommentPost={addCommentPost}
        getPostLikes={getPostLikes}
        addPostLikes={addPostLikes}
        deletePostLike={deletePostLike}
        follow={follow}
        cancelFollow={cancelFollow}
        deletePost={deletePost}
        getBookmarks={getBookmarks}
        addBookmark={addBookmark}
        deleteBookmark={deleteBookmark}
      />
      <OtherPosts
        selectedUserId={selectedUserId}
        getOtherPosts={getOtherPosts}
        getPostCounts={getPostCounts}
      />
    </>
  );
}

export default UserPostsContainer;
