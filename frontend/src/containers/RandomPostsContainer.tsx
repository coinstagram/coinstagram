import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomPostsSaga } from '../redux/modules/post';

// components
import RandomPosts from '../components/explore/RandomPosts';

function RandomPostsContainer() {
  const dispatch = useDispatch();

  const getRandomPosts = useCallback(() => {
    dispatch(getRandomPostsSaga());
  }, [dispatch]);

  return <RandomPosts getRandomPosts={getRandomPosts} />;
}

export default RandomPostsContainer;
