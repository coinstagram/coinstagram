import React, { useCallback, useState } from 'react';
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
import FollowListModal from './FollowListModal';

interface ProfileHeaderProps {
  myId: string;
  profileId: string;
  profileName: string;
  profileIntro: string;
  profileImage: null | string;
  followers: AnotherUserState[];
  followees: AnotherUserState[];
}

function ProfileHeader({ myId, profileId, profileName, profileIntro, profileImage, followers, followees }: ProfileHeaderProps) {
  const [state, setState] = useState({
    modal: false,
    isList: true,
    content: '',
  });
  const width = useWindowWidth();

  const toggleModal = useCallback(
    (content?: string, target?: EventTarget, curTarget?: EventTarget) => {
      const targetEl = target as Element;
      const curTargetEl = curTarget as Element;

      if (targetEl.classList.contains('thumbnail-click') && curTargetEl.classList.contains('followList-modal')) {
        setTimeout(() => {
          setState({
            ...state,
            modal: false,
            content,
          });
        }, 1400);
        return;
      }

      if (curTargetEl.classList.contains('followList-modal')) return;

      setState({
        modal: !state.modal,
        isList: true,
        content,
      });
    },
    [state],
  );

  return (
    <>
      <StyledSection width={width}>
        <h3 className="a11y-hidden">{profileId}의 프로필</h3>
        <ProfileThumbnail myId={myId} profileId={profileId} profileImage={profileImage} />
        <div className="info-container">
          <div className="id-container">
            <div>
              <dt className="a11y-hidden">user id</dt>
              <dd>{profileId}</dd>
            </div>
            {myId === profileId && width >= 750 && (
              <Link to="/edit">
                <span tabIndex={-1}>프로필 편집</span>
              </Link>
            )}
            {myId === profileId && (
              <button>
                <span tabIndex={-1} onClick={popModal}>
                  <IoIosSettings />
                </span>
              </button>
            )}
          </div>
          {myId === profileId && width < 750 && (
            <Link to="/edit">
              <span tabIndex={-1}>프로필 편집</span>
            </Link>
          )}
          {width >= 750 && (
            <>
              <ProfileCountInfo followers={followers} followees={followees} toggleModal={toggleModal} />
              <ProfileNameAndInroduce profileName={profileName} profileIntro={profileIntro} />
            </>
          )}
        </div>
        {width < 750 && (
          <>
            <ProfileNameAndInroduce profileName={profileName} profileIntro={profileIntro} />
            <ProfileCountInfo followers={followers} followees={followees} toggleModal={toggleModal} />
          </>
        )}
      </StyledSection>
      <FollowListModal
        myId={myId}
        followees={followees}
        followers={followers}
        modal={state.modal}
        content={state.content}
        isList={state.isList}
        toggleModal={toggleModal}
        popModal={popModal}
      />
    </>
  );

  function popModal() {
    setState({
      ...state,
      modal: !state.modal,
      isList: false,
    });
  }
}

export default ProfileHeader;
