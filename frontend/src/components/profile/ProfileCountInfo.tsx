import React from 'react';
import RootState, { AnotherUserState } from '../../type';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledDiv } from './ProfileCountInfoStyle';

interface ProfileCountInfo {
  followers: AnotherUserState[];
  followees: AnotherUserState[];
  toggleModal: (content?: string) => void;
}

function ProfileCountInfo({
  followers,
  followees,
  toggleModal,
}: ProfileCountInfo) {
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);
  const width = useWindowWidth();

  return (
    <StyledDiv width={width}>
      <span>
        게시물 <span>{otherPosts.length}</span>
      </span>
      <button onClick={e => toggleModal('팔로워')}>
        <span tabIndex={-1}>
          팔로워 <span>{followees.length}</span>
        </span>
      </button>
      <button onClick={e => toggleModal('팔로우')}>
        <span tabIndex={-1}>
          팔로우 <span>{followers.length}</span>
        </span>
      </button>
    </StyledDiv>
  );
}

export default ProfileCountInfo;
