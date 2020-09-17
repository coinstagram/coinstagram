import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomUserInfoSaga } from '../redux/modules/userInfo';
import RootState from '../type';

// components
import RecommendUsers from '../components/recommend/RecommendUsers';

function RecommendUsersContainer() {
  const dispatch = useDispatch();
  const { user, followers } = useSelector((state: RootState) => state.userInfo);

  const getRandomUser = useCallback(() => {
    dispatch(getRandomUserInfoSaga());
  }, [dispatch]);

  return (
    <RecommendUsers
      user={user}
      followers={followers.users}
      getRandomUser={getRandomUser}
    />
  );
}

export default RecommendUsersContainer;
