import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../type';

// components
import UserPosts from '../components/post/UserPosts';
import { getUserPostsSaga } from '../redux/modules/post';

function SpecificPostContainer() {
  const { loading, error, user } = useSelector(
    (state: RootState) => state.anotherUserInfo,
  );
  const dispatch = useDispatch();
  const user_id = user && user.user_id;
  console.log(user_id);

  const getUserPosts = useCallback(
    (userId: string) => {
      dispatch(getUserPostsSaga(userId));
    },
    [dispatch],
  );

  return <UserPosts />;
}

export default SpecificPostContainer;
