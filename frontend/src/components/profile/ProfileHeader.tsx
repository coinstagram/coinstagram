import React from 'react';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { AnotherUserState } from '../../type';

// icons
import { IoIosSettings } from 'react-icons/io';

// styles
import { StyledSection } from './ProfileHeaderStyle';

// components
import ProfileThumbnail from './ProfileThumbnail';
import ProfileCountInfo from './ProfileCountInfo';
import ProfileNameAndInroduce from './ProfileNameAndIntroduce';

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
  const width = useWindowWidth();

  return (
    <StyledSection width={width}>
      <h3 className="a11y-hidden">{profileId}의 프로필</h3>
      <ProfileThumbnail />
      <div className="info-container">
        <div className="id-container">
          <div>
            <dt className="a11y-hidden">user id</dt>
            <dd>{profileId}</dd>
          </div>
          {width >= 750 && (
            <Link to="/account/edit">
              <span tabIndex={-1}>프로필 편집</span>
            </Link>
          )}
          <button>
            <span tabIndex={-1}>
              <IoIosSettings />
            </span>
          </button>
        </div>
        {width < 750 && (
          <Link to="/account/edit">
            <span tabIndex={-1}>프로필 편집</span>
          </Link>
        )}
        {width >= 750 && (
          <>
            <ProfileCountInfo followers={followers} followees={followees} />
            <ProfileNameAndInroduce
              profileName={profileName}
              profileIntro={profileIntro}
            />
          </>
        )}
      </div>
      {width < 750 && (
        <>
          <ProfileNameAndInroduce
            profileName={profileName}
            profileIntro={profileIntro}
          />
          <ProfileCountInfo followers={followers} followees={followees} />
        </>
      )}
    </StyledSection>
  );
}

export default ProfileHeader;
