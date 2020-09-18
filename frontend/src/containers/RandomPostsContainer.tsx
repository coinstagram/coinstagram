import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomPostsSaga } from '../redux/modules/post';
import { getPostCountsSaga } from '../redux/modules/otherPost';

// components
import RandomPosts from '../components/explore/RandomPosts';

function RandomPostsContainer() {
  const dispatch = useDispatch();

  const getRandomPosts = useCallback(() => {
    dispatch(getRandomPostsSaga());
  }, [dispatch]);

  const getPostCounts = useCallback(
    (post_id: number) => {
      dispatch(getPostCountsSaga(post_id));
    },
    [dispatch],
  );

  return (
    <RandomPosts
      getRandomPosts={getRandomPosts}
      getPostCounts={getPostCounts}
    />
  );
}

export default RandomPostsContainer;
