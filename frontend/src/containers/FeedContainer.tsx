import React, { useCallback } from 'react';
import RootState from '../type';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPostsSaga } from '../redux/modules/post';

// components
import Feed from '../components/feed/Feed';

function FeedContainer() {
  const dispatch = useDispatch();
  const { posts, userInfo } = useSelector((state: RootState) => state);
  const { loading, error, FeedPosts } = posts;
  const user_profile = userInfo.user && userInfo.user.user_profile;

  const getFeedPosts = useCallback(
    (user_id: string) => {
      dispatch(getFeedPostsSaga(user_id));
    },
    [dispatch],
  );

  return (
    <Feed
      loading={loading}
      error={error}
      feedPosts={FeedPosts}
      userProfile={user_profile}
      getFeedPosts={getFeedPosts}
    />
  );
}

export default FeedContainer;
