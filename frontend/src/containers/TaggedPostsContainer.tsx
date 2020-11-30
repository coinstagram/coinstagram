import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetRandomPost } from '../redux/modules/post';
import { getPostCountsSaga } from '../redux/modules/otherPost';
import { resetMyComment } from '../redux/modules/comment';
import RootState from '../type';

// components
import TaggedPosts from '../components/explore/TaggedPosts';

function TaggedPostsContainer() {
  const dispatch = useDispatch();
  const { loading, error, randomPosts, isLast } = useSelector((state: RootState) => state.posts.randomPosts);

  useEffect(() => {
    dispatch(resetMyComment());

    return () => {
      dispatch(resetRandomPost());
    };
  }, [dispatch]);

  const getPostCounts = useCallback(
    (post_id: number) => {
      dispatch(getPostCountsSaga(post_id));
    },
    [dispatch],
  );

  return <TaggedPosts loading={loading} error={error} randomPosts={randomPosts} isLast={isLast} getPostCounts={getPostCounts} />;
}

export default TaggedPostsContainer;
