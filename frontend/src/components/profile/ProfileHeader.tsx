import React from 'react';

// icons
import { RiSettings3Line } from 'react-icons/ri';

// styles
import { StyledSection } from './ProfileHeaderStyle';

// components
import Thumbnail from '../common/Thumbnail';
import RootState, { AnotherUserState } from '../../type';
import { useSelector } from 'react-redux';

interface ProfileHeaderProps {
  profileId: string;
  profileName: string;
  profileIntro: string;
  followers: AnotherUserState[];
  followees: AnotherUserState[];
}

function ProfileHeader({
  profileId,
  profileName,
  profileIntro,
  followers,
  followees,
}: ProfileHeaderProps) {
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);

  return (
    <StyledSection>
      <h3 className="a11y-hidden">{profileId}의 프로필</h3>
      <div className="thumbnail-container">
        <input
          id="user-profile"
          className="a11y-hidden"
          type="file"
          accept="image/png, image/jpeg"
        />
        <label htmlFor="user-profile">
          <Thumbnail size={150} imageUrl={null} />
        </label>
      </div>
      <div className="info-container">
        <div>
          <dt className="a11y-hidden">user id</dt>
          <dd>{profileId}</dd>
        </div>
        <div>
          <span>게시물 {otherPosts.length}</span>
          <button>팔로워 {followees.length}</button>
          <button>팔로우 {followers.length}</button>
        </div>
        <div>
          <dt className="a11y-hidden">user name</dt>
          <dd>{profileName}</dd>
        </div>
        <div>
          <p>{profileIntro}</p>
        </div>
        <button>프로필 편집</button>
        <button>
          <RiSettings3Line />
        </button>
      </div>
    </StyledSection>
  );
}

export default ProfileHeader;
