import React, { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../App';
import { followContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import {
  StyledDiv,
  UsernameDiv,
  LocationDiv,
  StyledBtn,
} from './FeedHeaderStyle';

// components
import Thumbnail from '../common/Thumbnail';
import FollowBtn from '../recommend/FollowBtn';

interface FeedHeaderProps {
  userId: string;
  userProfile?: null | string;
  postId: number;
  location: null | string;
}

function FeedHeader({
  userId,
  userProfile,
  postId,
  location,
}: FeedHeaderProps) {
  const { user, followers } = useSelector((state: RootState) => state.userInfo);
  const myId = user && user.user_id;
  const myProfile = user && user.user_profile;
  const followersInfo = followers.users;
  const { popPostModal } = useContext(ModalContext);
  const value = useContext(followContext);
  const setFollowInfo = value && value.setFollowInfo;
  const changePostId = value && value.changePostId;
  const history = useHistory();
  const profileRef = useRef<string | null>(null);

  useEffect(() => {
    if (userId === myId) {
      profileRef.current = myProfile;
    } else {
      const feedFollower = followersInfo.find(
        follower => follower.user_id === userId,
      );

      profileRef.current = feedFollower && feedFollower.user_profile;
    }
  }, [followersInfo, myId, myProfile, userId]);

  return (
    <StyledDiv>
      <button onClick={pageMove}>
        <Thumbnail
          size={35}
          imageUrl={
            userProfile === undefined ? profileRef.current : userProfile
          }
        />
        <UsernameDiv tabIndex={-1} hasLocation={location}>
          <dt className="a11y-hidden">user id</dt>
          <dd>{userId}</dd>
        </UsernameDiv>
      </button>
      <Link to={`/explore/tags/${location}`}>
        <LocationDiv tabIndex={-1} hasLocation={location}>
          <dt className="a11y-hidden">location</dt>
          <dd>{location}</dd>
        </LocationDiv>
      </Link>
      {userId !== myId && (
        <FollowBtn
          top={23}
          right={50}
          userId={userId}
          userName={undefined}
          userProfile={profileRef.current}
          followers={followersInfo}
        />
      )}
      <StyledBtn onClick={setModal}>
        <div tabIndex={-1}>
          <span></span>
        </div>
      </StyledBtn>
    </StyledDiv>
  );

  function pageMove() {
    setTimeout(() => {
      history.push(`/account/${userId}`);
    }, 1000);
  }

  function setModal() {
    popPostModal();
    if (!changePostId || !setFollowInfo) return;
    changePostId(postId);
    const profile =
      userProfile === undefined ? profileRef.current : userProfile;
    setFollowInfo(userId, profile, null);
  }
}

export default React.memo(FeedHeader);
