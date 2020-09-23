import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnotherUserSaga } from '../redux/modules/anotherUser';
import RootState from '../type';
import { useLocation } from 'react-router-dom';
import { getOtherPostsSaga, getPostCountsSaga } from '../redux/modules/otherPost';
import { getBookmarkPostsSaga, getBookmarksSaga } from '../redux/modules/bookmark';
import { resetMyComment } from '../redux/modules/comment';

// components;
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';

function ProfileContainer() {
  const profileId = useLocation().pathname.split('/')[2];

  const dispatch = useDispatch();
  const bookmarkedId = useSelector((state: RootState) => state.bookmarks.bookmarks);
  const { user, followers, followees } = useSelector((state: RootState) => state.anotherUserInfo);
  const { userInfo } = useSelector((state: RootState) => state);
  const myId = userInfo.user && userInfo.user.user_id;
  const myName = userInfo.user && userInfo.user.user_name;
  const myProfile = userInfo.user && userInfo.user.user_profile;
  const myIntroduce = userInfo.user && userInfo.user.user_introduce;
  const myFollowers = userInfo.followers.users;
  const myFollowees = userInfo.followees;
  const profileName = user && user.user_name;
  const profileIntro = user && user.user_introduce;
  const profileImage = user && user.user_profile;
  const isMe = useCallback(() => myId === profileId, [myId, profileId]);

  useEffect(() => {
    if (isMe()) return;
    dispatch(getAnotherUserSaga(profileId));
  }, [dispatch, profileId, isMe]);

  useEffect(() => {
    dispatch(getOtherPostsSaga(profileId));
  }, [dispatch, profileId]);

  useEffect(() => {
    if (bookmarkedId.length !== 0) return;
    dispatch(getBookmarksSaga(myId));
  }, [bookmarkedId.length, dispatch, myId]);

  useEffect(() => {
    dispatch(resetMyComment());
  }, [dispatch]);

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
        profileId={isMe() ? myId : profileId}
        profileName={isMe() ? myName : profileName}
        profileIntro={isMe() ? myIntroduce : profileIntro}
        profileImage={isMe() ? myProfile : profileImage}
        followers={isMe() ? myFollowers : followers}
        followees={isMe() ? myFollowees : followees}
      />
      <ProfilePosts profileId={profileId} myId={myId} bookmarkedId={bookmarkedId} getBookmarkPosts={getBookmarkPosts} getPostCounts={getPostCounts} />
    </>
  );
}

export default ProfileContainer;
