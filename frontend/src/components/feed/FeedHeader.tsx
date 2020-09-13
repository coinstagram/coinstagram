import React, { useContext } from 'react';
import { ModalContext } from '../../App';
import { followContext } from '../HomeMain';
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

interface FeedHeaderProps {
  userId: string;
  userProfile: null | string;
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
  const { popPostModal } = useContext(ModalContext);
  const value = useContext(followContext);
  const setFollowInfo = value && value.setFollowInfo;
  const changePostId = value && value.changePostId;
  const history = useHistory();

  const user_id = user && user.user_id;
  const followersInfo = followers.users;

  console.log('feedheader');

  return (
    <StyledDiv>
      <button onClick={pageMove}>
        <Thumbnail size={35} imageUrl={userProfile} />
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
      {userId !== user_id &&
        followersInfo.some(follower => follower.user_id === userId) && (
          <span>팔로잉 중.</span>
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
      history.push(`/${userId}`);
    }, 1000);
  }

  function setModal() {
    popPostModal();
    if (!changePostId || !setFollowInfo) return;
    changePostId(postId);
    setFollowInfo(userId, userProfile, null);
  }
}

export default React.memo(FeedHeader);
