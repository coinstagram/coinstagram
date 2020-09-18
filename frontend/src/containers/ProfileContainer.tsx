import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnotherUserSaga } from '../redux/modules/anotherUser';
import RootState from '../type';
import { useLocation } from 'react-router-dom';
import {
  getOtherPostsSaga,
  getPostCountsSaga,
} from '../redux/modules/otherPost';
import {
  getBookmarkPostsSaga,
  getBookmarksSaga,
} from '../redux/modules/bookmark';

// components;
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';

function ProfileContainer() {
  const profileId = useLocation().pathname.split('/')[2];

  const dispatch = useDispatch();
  const bookmarkedId = useSelector(
    (state: RootState) => state.bookmarks.bookmarks,
  );
  const { user, followers, followees } = useSelector(
    (state: RootState) => state.anotherUserInfo,
  );
  const { userInfo } = useSelector((state: RootState) => state);
  const myId = userInfo.user && userInfo.user.user_id;
  const myFollowers = userInfo.followers.users;
  const myFollowees = userInfo.followees;
  const profileName = user && user.user_name;
  const profileIntro = user && user.user_introduce;
  const profileImage = user && user.user_profile;

  useEffect(() => {
    dispatch(getAnotherUserSaga(profileId));
  }, [dispatch, profileId]);

  useEffect(() => {
    dispatch(getOtherPostsSaga(profileId));
  }, [dispatch, profileId]);

  useEffect(() => {
    if (bookmarkedId.length !== 0) return;
    dispatch(getBookmarksSaga(myId));
  }, [bookmarkedId.length, dispatch, myId]);

  const getBookmarkPosts = useCallback(
    (post_id: number) => {
      dispatch(getBookmarkPostsSaga(post_id));
    },
    [dispatch],
  );

  const getPostCounts = useCallback(
    (post_id: number) => {
      dispatch(getPostCountsSaga(post_id));
    },
    [dispatch],
  );

  return (
    <>
      <ProfileHeader
        myId={myId}
        profileId={profileId}
        profileName={profileName}
        profileIntro={profileIntro}
        profileImage={profileImage}
        followers={myId === profileId ? myFollowers : followers}
        followees={myId === profileId ? myFollowees : followees}
      />
      <ProfilePosts
        profileId={profileId}
        myId={myId}
        bookmarkedId={bookmarkedId}
        getBookmarkPosts={getBookmarkPosts}
        getPostCounts={getPostCounts}
      />
    </>
  );
}

export default ProfileContainer;
