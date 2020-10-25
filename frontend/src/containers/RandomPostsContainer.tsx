import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomPostsSaga, resetRandomPost } from '../redux/modules/post';
import { getPostCountsSaga } from '../redux/modules/otherPost';
import { resetMyComment } from '../redux/modules/comment';
import RootState from '../type';

// components
import RandomPosts from '../components/explore/RandomPosts';

function RandomPostsContainer() {
  const dispatch = useDispatch();
  const { loading, error, randomPosts, isLast } = useSelector((state: RootState) => state.posts.randomPosts);

  useEffect(() => {
    dispatch(resetMyComment());

    return () => {
      dispatch(resetRandomPost());
    };
  }, [dispatch]);

  const getRandomPosts = useCallback(
    (count: number) => {
      dispatch(getRandomPostsSaga(count));
    },
    [dispatch],
  );

  const getPostCounts = useCallback(
    (post_id: number) => {
      dispatch(getPostCountsSaga(post_id));
    },
    [dispatch],
  );

  return <RandomPosts loading={loading} error={error} randomPosts={randomPosts} isLast={isLast} getPostCounts={getPostCounts} />;
}

export default RandomPostsContainer;
