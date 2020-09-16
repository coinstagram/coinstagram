import React, { useCallback } from 'react';
import RootState from '../type';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPostsSaga } from '../redux/modules/post';
import { getPostComments, addPostComment } from '../redux/modules/comment';
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

// components
import Feed from '../components/feed/Feed';

function FeedContainer() {
  const dispatch = useDispatch();
  const { posts, userInfo } = useSelector((state: RootState) => state);
  const { feedPosts } = posts.feedPosts;
  const { loading, error } = posts.feedPosts;
  const myId = userInfo.user && userInfo.user.user_id;

  const getFeedPosts = useCallback(
    (userId: string) => {
      dispatch(getFeedPostsSaga(userId));
    },
    [dispatch],
  );

  const getCommentsPost = useCallback(
    (post_id: number) => {
      dispatch(getPostComments(post_id));
    },
    [dispatch],
  );

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

  return (
    <Feed
      loading={loading}
      error={error}
      myId={myId}
      feedPosts={feedPosts}
      getFeedPosts={getFeedPosts}
      getCommentsPost={getCommentsPost}
      addCommentPost={addCommentPost}
      getPostLikes={getPostLikes}
      addPostLikes={addPostLikes}
      deletePostLike={deletePostLike}
      getBookmarks={getBookmarks}
      addBookmark={addBookmark}
      deleteBookmark={deleteBookmark}
    />
  );
}

export default React.memo(FeedContainer);
