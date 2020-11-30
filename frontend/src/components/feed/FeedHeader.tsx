import React, { useContext } from 'react';
import { ModalContext } from '../../App';
import { followContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../../type';

// styles
import { StyledDiv, UsernameDiv, LocationDiv, StyledBtn } from './FeedHeaderStyle';

// components
import Thumbnail from '../common/Thumbnail';
import FollowBtn from '../recommend/FollowBtn';

interface FeedHeaderProps {
  userId: string;
  userProfile?: null | string;
  postId: number;
  location: null | string;
}

function FeedHeader({ userId, postId, location }: FeedHeaderProps) {
  const { followers, user } = useSelector((state: RootState) => state.userInfo);
  const anotherUser = useSelector((state: RootState) => state.anotherUserInfo.user);
  const followersInfo = followers.users;
  const { popPostModal } = useContext(ModalContext);
  const value = useContext(followContext);
  const setFollowInfo = value && value.setFollowInfo;
  const changePostId = value && value.changePostId;
  const history = useHistory();

  const myId = user && user.user_id;
  const myProfile = user && user.user_profile;
  const anotherUserProfile = anotherUser && anotherUser.user_profile;

  return (
    <StyledDiv>
      <button onClick={pageMove}>
        <Thumbnail size={35} imageUrl={searchProfile()} />
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
        <FollowBtn top={23} right={50} userId={userId} userName={undefined} userProfile={searchProfile()} followers={followersInfo} />
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
    const followerProfile = searchProfile();
    setFollowInfo(userId, followerProfile, null);
  }

  function searchProfile() {
    const isFollower = followers.users.find(user => user.user_id === userId);
    if (myId === userId) {
      return myProfile;
    } else if (isFollower) {
      return isFollower.user_profile;
    }

    return anotherUserProfile;
  }
}

FeedHeader.defaultProps = {
  userProfile: null,
};

export default React.memo(FeedHeader);
