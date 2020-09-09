import React from 'react';
import { useSelector } from 'react-redux';
import RootState from '../type';

// components
import RecommendUsers from '../components/recommend/RecommendUsers';

function RecommendUsersContainer() {
  const { loading, error, user, randomUsers, followers } = useSelector(
    (state: RootState) => state.userInfo,
  );

  return (
    <RecommendUsers
      loading={loading}
      error={error}
      user={user}
      randomUsers={randomUsers}
      followers={followers.users}
    />
  );
}

export default RecommendUsersContainer;
