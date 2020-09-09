import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnotherUserSaga } from '../redux/modules/anotherUser';
import RootState from '../type';
import { useLocation } from 'react-router-dom';

// components;
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';

function ProfileMain() {
  const { anotherUserInfo } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const user_id = useLocation().pathname.split('/')[1];

  useEffect(() => {
    dispatch(getAnotherUserSaga(user_id));
  }, [dispatch, user_id]);

  return (
    <>
      <ProfileHeader />
      <ProfilePosts />
    </>
  );
}

export default ProfileMain;
