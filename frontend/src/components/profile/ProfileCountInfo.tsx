import React from 'react';
import RootState, { AnotherUserState } from '../../type';
import { useSelector } from 'react-redux';

// styles
import { StyledDiv } from './ProfileCountInfoStyle';

interface ProfileCountInfo {
  followers: AnotherUserState[];
  followees: AnotherUserState[];
}

function ProfileCountInfo({ followers, followees }: ProfileCountInfo) {
  const { otherPosts } = useSelector((state: RootState) => state.otherPosts);

  return (
    <StyledDiv>
      <span>게시물 {otherPosts.length}</span>
      <button>
        <span tabIndex={-1}>팔로워 {followees.length}</span>
      </button>
      <button>
        <span tabIndex={-1}>팔로우 {followers.length}</span>
      </button>
    </StyledDiv>
  );
}

export default ProfileCountInfo;
