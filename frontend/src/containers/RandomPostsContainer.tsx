import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomPostsSaga, resetRandomPost } from '../redux/modules/post';
import { getPostCountsSaga } from '../redux/modules/otherPost';
import { resetMyComment } from '../redux/modules/comment';

// components
import RandomPosts from '../components/explore/RandomPosts';

function RandomPostsContainer() {
  const dispatch = useDispatch();

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

  return <RandomPosts getRandomPosts={getRandomPosts} getPostCounts={getPostCounts} />;
}

export default RandomPostsContainer;
