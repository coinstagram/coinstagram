import React from 'react';
import { useSelector } from 'react-redux';
import RootState, { followState } from '../type';

// components
import FollowUsers from '../components/follower/FollowUsers';

function FollowUsersContainer() {
  const { loading, error, users }: followState = useSelector(
    (state: RootState) => state.userInfo.followers,
  );

  return <FollowUsers loading={loading} error={error} followers={users} />;
}

export default FollowUsersContainer;
